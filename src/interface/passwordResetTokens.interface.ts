import { Document, Types } from "mongoose";

export interface IPasswordResetTokens extends Document {
    token_id: string;
    token: number;
    isExpired: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: Types.ObjectId
}