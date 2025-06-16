import { Document, Types } from "mongoose";

export interface ILanguages extends Document {
    language_id: string;
    name: string;
    description: string;
    users?: Types.ObjectId[],
    topics: Types.ObjectId[]
}