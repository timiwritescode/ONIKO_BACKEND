import { model, Schema } from "mongoose";
import { ILanguages } from "../interface/languages.interface";
import {v4 as uuidv4} from "uuid"

const languagesSchema = new Schema<ILanguages>({
    language_id: {type: String, default: uuidv4},
    description: {type: String, required: false},
    users: [{type: Schema.Types.ObjectId, ref: "User"}]
})


export default model<ILanguages>("Languages", languagesSchema);