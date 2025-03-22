import { IEnvVariableTypes } from '@shared/types';
import dotenv from 'dotenv';
dotenv.config();

const env: IEnvVariableTypes = {
  API_PREFIX: process.env.API_PREFIX || 'api',
  API_VERSION: process.env.API_VERSION || 'v1',
};

export default env;
