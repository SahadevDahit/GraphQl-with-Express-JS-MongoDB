// models/comments.ts (lowercase)
import mongoose, { Schema, Document, Types } from 'mongoose';

interface Icomments extends Document {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentsSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "comment must belong to a user"],
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "comment must belong to a post"],
    },
    content: { type: String, required: true },
});

const commentsModel = mongoose.model<Icomments>('comments', commentsSchema); // lowercase model name

export default commentsModel;
