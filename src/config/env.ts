/* eslint-disable no-undef */
import { IEnvVariableTypes } from '@shared/types';
import dotenv from 'dotenv';
dotenv.config();

const env: IEnvVariableTypes = {
  API_PREFIX: process.env.API_PREFIX || 'api',
  API_VERSION: process.env.API_VERSION || 'v1',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/lms-system',
  PORT: Number(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
};

export default env;
