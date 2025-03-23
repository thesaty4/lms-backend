import mongoose from 'mongoose';

export interface ISubtopic extends Document {
  topicId: mongoose.Schema.Types.ObjectId;
  name: string; // Example: Statements inside "Syntax"
}

// Interface for subtopic request body
export interface ISubtopicRequestBody {
  name: string;
  topicId: string;
}
