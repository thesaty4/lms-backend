import env from '@config/env';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const registerUser = async (
  email: string,
  password: string,
  role: string = 'user',
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });

  await newUser.save();
  return { message: 'User registered successfully' };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );

  return { token };
};
