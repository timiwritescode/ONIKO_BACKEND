import { Document, Types } from "mongoose";

export interface IToken extends Document {
    token_id: string;
    token: number;
    expiresAt: Date;
    isExpired: boolean;
    isBlacklisted: boolean;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    user: Types.ObjectId
}