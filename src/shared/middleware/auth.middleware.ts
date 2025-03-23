import env from '@config/env';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IAuthenticatedRequest extends Request {
  user?: string | object;
}

export const authMiddleware = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    req.user = decoded; // Attaching decoded user to the request object
    next();
  } catch (_e) {
    return res.status(400).json({ error: 'Invalid token' + _e });
  }
};
