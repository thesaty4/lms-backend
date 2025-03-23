import mongoose from 'mongoose';

export interface ITopic extends Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string; // Example: Syntax, Variables, Loops
}
