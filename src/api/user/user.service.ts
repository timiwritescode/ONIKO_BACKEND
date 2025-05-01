import ConflictException from "../../exceptions/conflict.exception";
import NotFoundException from "../../exceptions/notFound.exception";
import { IUser } from "../../interface/user.interface";
import userModel from "./model/user.model";

export async function createUser(user: Partial<IUser>): Promise<Partial<IUser>> {
    try {
        const result = await userModel.create(user);
        
        return result

    } catch (err) {
        if (err.code === 11000 ) {
            throw new ConflictException("User already exists")
        }
    
    }
}


export async function getUserByEmail(email: string): Promise<Partial<IUser>> {
        const user = await userModel.findOne({
            email:email
        });

        return user

}