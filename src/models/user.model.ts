import { Schema, model } from "mongoose";
import {v4 as uuidV4} from "uuid"
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>({
    user_id: {
        type: String,
        default: uuidV4,
        unique: true,
    },

    passwordHash: {
        type: String,
        required: [true, "Password is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function(v: string) {
                return /\S+@\S+\.\S+/.test(v);
            },
        message: props => `${props.value} is not a valid email address`
        }
    },

    username: { type: String, required: [true, 'username is required']},

    profile: { type: Schema.Types.ObjectId, ref: "Profile", unique: true },

    languages: [{type: Schema.Types.ObjectId, ref: "languages"}]

})


export default model<IUser>('User', userSchema);