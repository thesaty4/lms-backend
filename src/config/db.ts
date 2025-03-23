/* eslint-disable no-undef */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import env from './env';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI as string);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
