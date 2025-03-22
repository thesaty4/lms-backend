import { globalPrefixMiddleware } from '@shared/middleware/global-prefix.middleware';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import authRoutes from './modules/users/routes/auth.route';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

/** @middleware globalPrefixMiddleware will add the prefix, versioning via env or default /api/v1/ */
app.use(globalPrefixMiddleware);

/** TODO: This is for the testing */
app.use('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the LMS' });
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
