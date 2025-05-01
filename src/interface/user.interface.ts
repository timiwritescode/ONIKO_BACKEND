import { Document, Schema } from "mongoose";


export interface IUser extends Document {
    user_id: string,
    email: string;
    name: string;
    password: string;
}