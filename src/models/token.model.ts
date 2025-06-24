import { model, Schema } from "mongoose";
import { IToken } from "../interface/passwordResetTokens.interface";
import {v4 as uuidv4} from "uuid";


const tokenSchema = new Schema<IToken>({
    token_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    token: {
        type: Number,
        maxlength: 6,
        minlength: 6
    },

    type: {
        type: String,
        enum: ["password-reset", "email-verification"],
        required: true
    },

    isBlacklisted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: { 
        type: Date,
        default: Date.now
    },

    user: {type: Schema.Types.ObjectId, ref: "User"}
})


tokenSchema.virtual("isExpired").get(function () {
    const now = Date.now();
    let time: number;
    switch(this.type) {
        case "password-reset":
            time = 60 * 15 * 1000;
            break;
        case "verify":
            time = 60 * 60 * 1000;
            break;
        default:
            time = 60 * 60 * 10000
    }
    return now - this.createdAt.getTime() > time;


})



export default model<IToken>("Tokens", tokenSchema)

