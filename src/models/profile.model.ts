import { model, Schema } from "mongoose";
import { IProfile } from "../interface/profile.interface";
import {v4 as uuidv4} from "uuid";

const profileSchema = new Schema<IProfile>({
    profile_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    country: {
        type: String
    },

    bio: {
        type: String
    },

    user: { type: Schema.Types.ObjectId, ref: "User", unique: true}
})


export default model<IProfile>("Profile", profileSchema)