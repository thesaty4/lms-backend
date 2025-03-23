import mongoose, { Schema } from 'mongoose';
import { ISubtopic } from '../types/subtopic.type';

const SubtopicSchema = new Schema<ISubtopic>({
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  name: { type: String, required: true },
});

export default mongoose.model<ISubtopic>('Subtopic', SubtopicSchema);
