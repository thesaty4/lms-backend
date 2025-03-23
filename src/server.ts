/* eslint-disable no-undef */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'module-alias/register';
import connectDB from './config/db';
import env from './config/env';
import allRoutes from './routes';
import { globalPrefixMiddleware } from './shared/middleware/global-prefix.middleware';

function bootstrap() {
  dotenv.config();
  connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  /** @middleware globalPrefixMiddleware will add the prefix, versioning via env or default /api/v1/ */
  app.use(globalPrefixMiddleware);

  /** TODO: This is for the testing */
  app.use('/', (_req, res) => {
    res.status(200).json({ message: 'Welcome to the LMS' });
  });

  /** @middleware allRoutes will add all the routes */
  app.use(allRoutes);

  const PORT = env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

bootstrap();
