import env from '@config/env';
import { NextFunction, Request, Response } from 'express';

const GLOBAL_PREFIX = `/${env.API_PREFIX}/${env.API_VERSION}`;

export const globalPrefixMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.url = `${GLOBAL_PREFIX}${req.url}`;
  next();
};
