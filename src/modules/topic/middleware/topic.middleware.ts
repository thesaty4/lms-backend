import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationErrorItem } from 'joi';
import { apiResponseType } from '../../../shared/constants';
import { objectIdValidation } from '../../../shared/utils';
import apiResponse from '../../../shared/utils/api-response.util';

// Interface for validation errors
interface IValidationError {
  field: string;
  message: string;
}

// Interface for topic request body
interface ITopicRequestBody {
  name: string;
  categoryId: string;
}

// Extend Request type for validated data
interface ICustomRequest extends Request {
  body: ITopicRequestBody;
  validatedData?: ITopicRequestBody;
}

// Define validation schema
const topicValidatorSchema = Joi.object<ITopicRequestBody>({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Title must be at least 3 characters long',
    'any.required': 'Title is required',
  }),
  categoryId: objectIdValidation.required(),
});

// Middleware for validating topic creation
export const validateTopic = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const { error, value } = topicValidatorSchema.validate(req.body, {
      abortEarly: false, // Collect all errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errors: IValidationError[] = error.details.map(
        (detail: ValidationErrorItem) => ({
          field: detail.path[0]?.toString() ?? 'unknown',
          message: detail.message,
        }),
      );

      apiResponse(res, {
        ...apiResponseType.BAD_REQUEST,
        data: { errors },
      });
      return;
    }

    req.validatedData = value;
    next();
  } catch (err) {
    apiResponse(res, {
      ...apiResponseType.BAD_REQUEST,
      data: { error: (err as Error).message },
    });

    return;
  }
};
