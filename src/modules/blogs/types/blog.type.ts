import { Document, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId; // Change here
  tags?: string[];
  category: Types.ObjectId; // Change here
  status: BLOG_STATUS_ENUM;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum BLOG_STATUS_ENUM {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}
