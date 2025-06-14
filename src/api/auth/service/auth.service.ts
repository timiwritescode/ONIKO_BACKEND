import { compare } from "bcrypt";
import BaseException from "../../../exceptions/base.exception";
import {InternalServerErrorException, UnauthorizedException} from "../../../exceptions/index.error";
import { hashPassword, isPasswordMatch } from "../../../utils/password--hash.util";
import { createUser, getUserByEmail } from "../../user/user.service";
import { SignInDto } from "../dto/signIn.dto";
import { SignUpDto } from "../dto/signUp.dto";
import { SignUpResponseDto } from "../dto/signUpResponse.dto";
import { SignInResponseDto } from "../dto/signInResponse.dto";
import { generateAccessToken } from "../../../utils/util";
import { JwtPayload } from "../../../interface/jwtPayload.interface";
import { logger } from "../../../config/logger";

export async function signUpUser(dto: SignUpDto): Promise<SignUpResponseDto> {
    try {
        dto.password = await hashPassword(dto.password);
        const user = await createUser(dto);
        
        // dispatch event to 

        return new SignUpResponseDto(user.user_id)
            
    } catch (error) {
        if (error instanceof BaseException) {
            throw error;
        }        

        logger.error("Sign up user error: " + error.message)
        throw new InternalServerErrorException();
    }

}



export async function signInUser(dto: SignInDto): Promise<SignInResponseDto>{
    try {
        const user = await getUserByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException("Invalid Login Credentials");
        }
        
        if (!(await isPasswordMatch(dto.password, user.password))) {
            throw new UnauthorizedException("Invalid login credentials")
        }
        const payload: JwtPayload = {
            user_id: user.user_id
        }
        const accesToken = generateAccessToken(payload);

        return new SignInResponseDto(accesToken);
    } catch (error) {
        if (error instanceof BaseException) {
            throw error; 
        }

        logger.error("Sigin in user error: " + error.message)
        throw new InternalServerErrorException()
    }
}