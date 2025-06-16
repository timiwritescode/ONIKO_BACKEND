import { Document, Types } from "mongoose";

export interface ILanguageResources extends Document {
    resource_id: string,
    topic: Types.ObjectId;
}