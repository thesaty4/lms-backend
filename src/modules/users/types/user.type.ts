import mongoose from 'mongoose';

export enum USER_ROLE_ENUM {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  createdAt?: Date;
}
