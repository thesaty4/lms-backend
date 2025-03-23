import mongoose, { Schema } from 'mongoose';
import { IEContent } from '../types/e-content.type';

const ContentSchema = new Schema<IEContent>({
  title: { type: String, required: true },
  details: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  subTopicId: { type: Schema.Types.ObjectId, ref: 'SubTopic', required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IEContent>('EContent', ContentSchema);
