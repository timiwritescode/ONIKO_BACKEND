import mongoose, { Types } from "mongoose";
import ConflictException from "../../exceptions/conflict.exception";
import { IUser } from "../../interface/user.interface";
import profileModel from "../../models/profile.model";
import userModel from "../../models/user.model";
import NotFoundException from "../../exceptions/notFound.exception";
import BaseException from "../../exceptions/base.exception";
import { logger } from "../../config/logger";
import InternalServerErrorException from "../../exceptions/internalServerError.exception";
import { GeneralResponse } from "../../dto/general-response.dto";
import { ProfileResponseDto } from "./dto/profile.dto";


export async function createUser(userDto: Partial<IUser>): Promise<Partial<IUser>> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const [user] = await userModel.create([userDto], { session });
        const [profile] = await profileModel.create([{user: user._id}], { session });
        
        user.profile = profile._id as Types.ObjectId;
        await user.save({ session });

        await session.commitTransaction();
        return user;
        
    } catch (err) {
        if (err.code === 11000 ) {
            console.error(err.message)
            throw new ConflictException("User already exist")
        }
        await session.abortTransaction();
        throw err;
    
    } finally {
        session.endSession();
    }
} 



export async function getUserByEmail(email: string): Promise<IUser> {
        const user = await userModel.findOne({
            email:email
        });

        return user

}


export async function getUserProfile(userId: string): Promise<GeneralResponse> {
    try {
        const user = await userModel.findOne({user_id: userId}).populate("profile");

        if (!user) {
            throw new NotFoundException("User not found")
        }
        
        return new GeneralResponse(
            true,
            "Profile retrieved successfully",
            new ProfileResponseDto(user)
        )

    } catch (error) {
        if (error instanceof BaseException) {
            throw error
        }

        logger.error(error.message);
        throw new InternalServerErrorException("An error occured")
    }   
}

// export const function createUserProfile()