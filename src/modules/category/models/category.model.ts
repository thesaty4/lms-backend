import { Schema, model } from 'mongoose';
import { ICategory } from '../types/category.type';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true },
);

// Register the model
export default model<ICategory>('Category', CategorySchema);
