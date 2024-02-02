// models/posts.ts (lowercase)
import mongoose, { Schema, Document, Types } from 'mongoose';

interface IPosts extends Document {
    userId: Types.ObjectId;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const postsSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Review must belong to a user"],
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const postsModel = mongoose.model<IPosts>('posts', postsSchema); // lowercase model name

export default postsModel;
