import { compare } from "bcrypt";
import BaseException from "../../../exceptions/base.exception";
import {InternalServerErrorException, NotFoundException, UnauthorizedException} from "../../../exceptions/index.error";
import { hashPassword, isPasswordMatch } from "../../../utils/password--hash.util";
import { createUser, getUserByEmail } from "../../user/user.service";
import { SignInDto } from "../dto/signIn.dto";
import { SignUpDto } from "../dto/signUp.dto";
import { SignUpResponseDto } from "../dto/signUpResponse.dto";
import { SignInResponseDto } from "../dto/signInResponse.dto";
import { generateAccessToken } from "../../../utils/util";
import { JwtPayload } from "../../../interface/jwtPayload.interface";
import { logger } from "../../../config/logger";
import { GeneralResponse } from "../../../dto/general-response.dto";
import { USER_CREATED_MESSAGE } from "../util/messages.util";
import { ForgotPasswordDto } from "../dto/forgotPassword.dto";
import { createOTP } from "../util/util";
import passwordResetTokenModel from "../../../models/passwordResetToken.model";
import mongoose, { Types } from "mongoose";
import { eventDispatch } from "../../../events/eventDispatcher.util";
import { ForgotPasswordEventPayload } from "../events/forgot-password.events";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { IUser } from "../../../interface/user.interface";
import { IPasswordResetTokens } from "../../../interface/passwordResetTokens.interface";
import { UserRegisteredEventPayload } from "../events/user-registed.event";


export async function signUpUser(dto: SignUpDto): Promise<GeneralResponse> {
    try {
        // dto.password = await hashPassword(dto.password);
        dto["passwordHash"] = await hashPassword(dto.password);
        const user = await createUser(dto);
        
        // dispatch event to send verification
        const token = await createToken(user);
        const payload: UserRegisteredEventPayload = {
            email: user.email,
            token: token.token.toString()
        }

        eventDispatch.emit("auth:user-registered", payload);

        return new GeneralResponse(
            true, 
            USER_CREATED_MESSAGE, 
            new SignUpResponseDto(user.user_id))
            
    } catch (error) {
        if (error instanceof BaseException) {
            throw error;
        }        

        logger.error("Sign up user error: " + error.message)
        throw new InternalServerErrorException();
    }

}


async function createToken(user: Partial<IUser>): Promise<IPasswordResetTokens>{
    const token = createOTP(6);
    const tokenInDb = await passwordResetTokenModel.create({
        token: token,
        usr: user.email
    })

    return tokenInDb

}

export async function signInUser(dto: SignInDto): Promise<SignInResponseDto>{
    try {
        const user = await getUserByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException("Invalid Login Credentials");
        }
        
        if (!(await isPasswordMatch(dto.password, user.passwordHash))) {
            throw new UnauthorizedException("Invalid login credentials")
        }
        const payload: JwtPayload = {
            user_id: user.user_id
        }
        const accesToken = generateAccessToken(payload);

        return new SignInResponseDto(accesToken)
    } catch (error) {
        if (error instanceof BaseException) {
            throw error; 
        }

        logger.error("Sigin in user error: " + error.message)
        throw new InternalServerErrorException()
    }
}


export async function forgotPassword(dto: ForgotPasswordDto): Promise<GeneralResponse> {
    try {
        // get user by email
        const userInDb = await getUserByEmail(dto.email);

        if (userInDb) {
                    // create new otp for user
        const token = await createToken(userInDb);
        // emit forgot password event

        const eventPayload: ForgotPasswordEventPayload = {
            token: token.token.toString(),
            email: userInDb.email

        }
        eventDispatch.emit("auth:forgot-password-requested", eventPayload)
  
        // console.log(eventDispatch.listenerCount("auth:forgot-password-requested"))
        }
        
        return new GeneralResponse(true, "Password reset OTP sent to your mail", {})
    } catch (error) {
        logger.error("Forgot password error: " + error.message)
        throw new InternalServerErrorException();
    }
}

export async function resetPassword(dto: ResetPasswordDto): Promise<GeneralResponse> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // check email against the sent code
        const userInDb = await getUserByEmail(dto.email);
        if (!userInDb) {
            throw new NotFoundException("User does not exist or invalid token")
        }
        const tokenInDb = await passwordResetTokenModel.findOne({token: dto.token, user: userInDb._id});
        if (!tokenInDb) {
            throw new NotFoundException("User does not exist or invalid token")
        }
        // check code validity in terms of expiry
        
        if (tokenInDb.isExpired) {
            throw new NotFoundException("User not does not exist or invalid token");
        }
        // hash new password
        const passwordHash = await hashPassword(dto.new_password);
        // update the password
        userInDb.passwordHash = passwordHash;
        userInDb.save();
        
        // delete token 
        await passwordResetTokenModel.deleteOne(tokenInDb._id);
        await session.commitTransaction();
        return new GeneralResponse(true, "password reset succesful", {});
    } catch (error) {
        if (error instanceof BaseException) {
            throw error;
        }
        await session.abortTransaction();
        logger.error("Reset Password error: " + error.message)
        throw new InternalServerErrorException("An error occured")
    } finally {
        session.endSession();
    }
}