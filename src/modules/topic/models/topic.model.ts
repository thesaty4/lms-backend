import mongoose, { Schema } from 'mongoose';
import { ITopic } from '../types/topic.type';

const TopicSchema = new Schema<ITopic>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
});

export default mongoose.model<ITopic>('Topic', TopicSchema);
