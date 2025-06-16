import { model, Schema } from "mongoose";
import { ITopics } from "../interface/topics.interface";
import {v4 as uuidv4} from "uuid"


const topicsSchema = new Schema<ITopics>({
    topic_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    language: {type: Schema.Types.ObjectId, ref:  "Languages"},

    resources: [{type: Schema.Types.ObjectId, ref: "Respources"}]
})


export default model<ITopics>("Topics", topicsSchema);