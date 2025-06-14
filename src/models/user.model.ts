import { Schema, model } from "mongoose";
import {v4 as uuidV4} from "uuid"
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>({
    user_id: {
        type: String,
        default: uuidV4,
        unique: true,
    },

    password: {
        type: String,
        minlength: [8, "Password should have a minimum of 8 characters"],
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

    name: {
        type: String,
        required: [true, 'Name is required']
    }
})


export default model<IUser>('USer', userSchema);