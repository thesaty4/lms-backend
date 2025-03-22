import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationErrorItem } from 'joi';

// Interface for error response
interface IValidationError {
  field: string;
  message: string;
}

// Define request body type
interface IAuthRequestBody {
  email: string;
  password: string;
}

// Extend Request type for validated data
interface ICustomRequest extends Request {
  body: IAuthRequestBody; // Ensure request body has defined properties
  validatedData?: IAuthRequestBody;
}

// Define validation schema
const authValidatorSchema = Joi.object<IAuthRequestBody>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(8) // Enforce minimum length of 8
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
});

// Middleware for validation
export const validateAuth = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Validate request body
    const { error, value } = authValidatorSchema.validate(req.body, {
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

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    // Store validated data in the request
    req.validatedData = value;

    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Validation error',
      error: (err as Error).message,
    });
  }
};
