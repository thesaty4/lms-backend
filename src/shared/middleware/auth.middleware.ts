import env from '@config/env';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createApiResponse } from '../constants';
import { IErrorResponse } from '../types';
import apiResponse from '../utils/api-response.util';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    const apiResponseData = createApiResponse('UNAUTHORIZED', {
      message: 'Access denied. No token provided.',
      data: null,
    });
    apiResponse(res, apiResponseData);
    return;
  }

  try {
    jwt.verify(token, env.JWT_SECRET as string);
    // req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    const apiResponseData = createApiResponse('BAD_REQUEST', {
      message: 'Invalid token',
      data: (error as IErrorResponse).message,
    });
    apiResponse(res, apiResponseData);
  }
};
