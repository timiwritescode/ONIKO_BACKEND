import { model, Schema } from "mongoose";
import { ILanguageResources } from "../interface/resources.interface";
import {v4 as uuidv4} from "uuid"

const resourcesSchema = new Schema<ILanguageResources>({
    resource_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    topic: {type: Schema.Types.ObjectId, ref: "Topics"}
})


export default model<ILanguageResources>("LanguageResources", resourcesSchema)