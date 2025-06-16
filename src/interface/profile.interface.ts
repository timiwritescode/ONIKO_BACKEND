import { Document } from "mongoose";
import { IUser } from "./user.interface";
import { Types } from "mongoose";

export interface IProfile extends Document {
    profile_id?: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    bio?: string;
    user?: Types.ObjectId
}