/* eslint-disable no-undef */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'module-alias/register';
import connectDB from './config/db';
import env from './config/env';
import allRoutes from './routes';
import { apiResponseType } from './shared/constants';
import apiResponse from './shared/utils/api-response.util';

const globalPrefix = `/${env.API_PREFIX}/${env.API_VERSION}`;

function bootstrap() {
  dotenv.config();
  connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  /** TODO: This is for testing - Returns a simple message */
  app.get('/', (_req, res) => {
    apiResponse(res, {
      ...apiResponseType.SUCCESS,
      data: { message: 'Welcome to the LMS' },
    });
  });

  /** @middleware allRoutes will add all the routes */
  app.use(globalPrefix, allRoutes);

  const PORT = env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

bootstrap();
