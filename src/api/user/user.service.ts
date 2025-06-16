import mongoose, { Types } from "mongoose";
import ConflictException from "../../exceptions/conflict.exception";
import { IUser } from "../../interface/user.interface";
import profileModel from "../../models/profile.model";
import userModel from "../../models/user.model";


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

export async function createUserProfile(user: Partial<IUser>) {
    try {
        console.log("here")
        const profile = await profileModel.create({
            user: user._id
        })

        user.profile = profile._id as Types.ObjectId
        await user.save()
    } catch(err) {
        throw err
    }
}

export async function getUserByEmail(email: string): Promise<Partial<IUser>> {
        const user = await userModel.findOne({
            email:email
        });

        return user

}


// export const function createUserProfile()