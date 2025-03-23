import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  createdAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
