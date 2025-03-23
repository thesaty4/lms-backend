import env from '@config/env';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { filterObject } from '../../../shared/utils';
import User from '../models/user.model';

export class AuthService {
  /** Creating a new user */
  static async registerUser(
    email: string,
    password: string,
    role: string = 'user',
  ) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });

    await newUser.save();

    // Convert the Mongoose document to a plain object and exclude password
    return filterObject(newUser, {
      isDB: true,
      excludedKeys: ['password'],
    });
  }

  /** Login user */
  static async loginUser(email: string, password: string) {
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
      { expiresIn: '1h' },
    );

    return {
      ...filterObject(user, {
        isDB: true,
        excludedKeys: ['password'],
      }),
      token,
    };
  }
}
