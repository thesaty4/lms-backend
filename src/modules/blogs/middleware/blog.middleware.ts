import { createApiResponse } from '@shared/constants';
import apiResponse from '@shared/utils/api-response.util';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';
import { BLOG_STATUS_ENUM } from '../types/blog.type';

const objectIdValidation = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  slug: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  author: objectIdValidation.required(),
  category: objectIdValidation.required(),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .valid(...Object.values(BLOG_STATUS_ENUM)) // Ensuring only allowed values
    .required(),
});

export const validateBlog = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = blogSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const apiResponseData = createApiResponse('BAD_REQUEST', {
      message: 'Validation failed',
      data: error.details.map((err) => err.message),
    });
    apiResponse(res, apiResponseData);
  }

  next();
};
