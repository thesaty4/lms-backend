import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationErrorItem } from 'joi';
import { apiResponseType } from '../../../shared/constants';
import apiResponse from '../../../shared/utils/api-response.util';
import { USER_ROLE_ENUM } from '../types/user.type';

// Define valid user roles
const validRoles = [
  USER_ROLE_ENUM.ADMIN,
  USER_ROLE_ENUM.USER,
] as USER_ROLE_ENUM[];

// Interface for error response
interface IValidationError {
  field: string;
  message: string;
}

// Define request body type
interface IAuthRequestBody {
  email: string;
  password: string;
  role?: (typeof validRoles)[number]; // Restrict roles to predefined values
  createdAt?: string;
}

// Extend Request type for validated data
interface ICustomRequest extends Request {
  body: IAuthRequestBody;
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
  password: Joi.string().min(3).required().messages({
    'string.min': 'Password must be at least 3 characters long',
    'any.required': 'Password is required',
  }),
  role: Joi.string()
    .valid(...validRoles)
    .optional()
    .messages({
      'any.only': `Role must be one of: ${validRoles.join(', ')}`,
    }),
  createdAt: Joi.string().isoDate().optional().messages({
    'string.isoDate':
      'Created date must be a valid ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)',
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

      apiResponse(res, {
        ...apiResponseType.BAD_REQUEST,
        data: { errors },
      });
      return;
    }

    // Store validated data in the request
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
