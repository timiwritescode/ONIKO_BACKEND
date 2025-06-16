import { Document, Types } from "mongoose";

export interface ITopics extends Document {
    topic_id: string;
    title: string;
    resources: Types.ObjectId[];
    language: Types.ObjectId;
}