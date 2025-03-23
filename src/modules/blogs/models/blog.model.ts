import { Schema, model } from 'mongoose';
import { BLOG_STATUS_ENUM, IBlog } from '../types/blog.type';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Fix here
    tags: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Fix here
    status: {
      type: String,
      enum: [BLOG_STATUS_ENUM.DRAFT, BLOG_STATUS_ENUM.PUBLISHED],
      default: BLOG_STATUS_ENUM.DRAFT,
    },
  },
  { timestamps: true },
);

export default model<IBlog>('Blog', BlogSchema);
