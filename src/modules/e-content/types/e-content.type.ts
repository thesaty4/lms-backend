import mongoose from 'mongoose';

export interface IEContent extends Document {
  title: string;
  details: string;
  userId: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
  topicId: mongoose.Schema.Types.ObjectId;
  subTopicId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  lastUpdated: Date;
}
