import { createApiResponse } from '@shared/constants';
import apiResponse from '@shared/utils/api-response.util';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// Category Schema Validation
const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).optional(),
});

// Middleware to validate category request body
export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const apiResponseData = createApiResponse('BAD_REQUEST', {
      message: 'Validation failed',
      data: error.details.map((err) => err.message),
    });
    apiResponse(res, apiResponseData);
  }

  next();
};
