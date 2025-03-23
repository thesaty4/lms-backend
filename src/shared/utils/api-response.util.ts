import { Response } from 'express';
import { IApiResponse } from '../types';

/**
 * Middleware to standardize API responses.
 */
const apiResponse = <T>(res: Response, config: IApiResponse<T>) => {
  const { status, message, data } = config;
  return res.status(status).json({
    status: status,
    message,
    data,
  });
};

export default apiResponse; // ✅ Ensure default export
