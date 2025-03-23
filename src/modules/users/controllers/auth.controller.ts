import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { email, password, role } = req.body;
      const response = await AuthService.registerUser(email, password, role);
      apiResponseData = createApiResponse('CREATED', {
        message: 'User created successfully',
        data: response,
      });
    } catch (error) {
      apiResponseData = createApiResponse('BAD_REQUEST', {
        message: 'User creation failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async login(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { email, password } = req.body;
      const response = await AuthService.loginUser(email, password);

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'User logged in successfully',
        data: response,
      });
    } catch (error) {
      apiResponseData = createApiResponse('UNAUTHORIZED', {
        message: 'Login failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }
}
