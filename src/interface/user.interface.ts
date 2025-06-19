import { Document, Schema, Types } from "mongoose";
import { IProfile } from "./profile.interface";


export interface IUser extends Document {
    user_id: string,
    email: string;
    username: string;
    passwordHash: string;
    profile?: Types.ObjectId | IProfile;
    languages: Types.ObjectId[];
}