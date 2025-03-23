import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  let apiResponseData: IApiResponse;
  try {
    const { email, password, role } = req.body;
    const response = await registerUser(email, password, role);
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
};

export const login = async (req: Request, res: Response) => {
  let apiResponseData: IApiResponse;
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);

    apiResponseData = createApiResponse('SUCCESS', {
      message: 'User logged in successfully',
      data: response,
    });
  } catch (error) {
    apiResponseData = createApiResponse('UNAUTHORIZED', {
      data: { error: (error as IErrorResponse).message },
    });
  }

  apiResponse(res, apiResponseData);
};
