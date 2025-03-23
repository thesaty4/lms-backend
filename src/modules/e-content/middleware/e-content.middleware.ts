import { createApiResponse } from '@shared/constants';
import apiResponse from '@shared/utils/api-response.util';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { objectIdValidation } from '../../../shared/utils';

// Content Schema Validation
const contentSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  details: Joi.string().min(10).required(),
  userId: objectIdValidation.required(),
  categoryId: objectIdValidation.required(),
  topicId: objectIdValidation.required(),
  subTopicId: objectIdValidation.required(),
});

// Middleware to validate content request body
export const validateContent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = contentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const apiResponseData = createApiResponse('BAD_REQUEST', {
      message: 'Validation failed',
      data: error.details.map((err) => err.message),
    });
    apiResponse(res, apiResponseData);
  }

  next();
};
