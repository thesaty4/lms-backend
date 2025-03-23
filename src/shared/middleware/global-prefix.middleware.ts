import env from '@config/env';
import { NextFunction, Request, Response } from 'express';

const globalPrefix = `/${env.API_PREFIX}/${env.API_VERSION}`;

export const globalPrefixMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.url = `${globalPrefix}${req.url}`;
  next();
};
