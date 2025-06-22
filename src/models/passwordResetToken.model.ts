import { model, Schema } from "mongoose";
import { IPasswordResetTokens } from "../interface/passwordResetTokens.interface";
import {v4 as uuidv4} from "uuid";


const passwordResetTokensSchema = new Schema<IPasswordResetTokens>({
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


passwordResetTokensSchema.virtual("isExpired").get(function () {
    const now = Date.now();
    const created = this.createdAt.getTime();
    const fiftenMinutes = 60 * 15 * 1000;

    return now - created > fiftenMinutes;


})



export default model<IPasswordResetTokens>("PasswordResetTokens", passwordResetTokensSchema)

