import { IApiResponse } from '../types';

export const apiResponseType = {
  SUCCESS: {
    status: 200,
    message: 'Success',
  },
  CREATED: {
    status: 201,
    message: 'Created',
  },
  ACCEPTED: {
    status: 202,
    message: 'Accepted',
  },
  NO_CONTENT: {
    status: 204,
    message: 'No Content',
  },
  MOVED_PERMANENTLY: {
    status: 301,
    message: 'Moved Permanently',
  },
  FOUND: {
    status: 302,
    message: 'Found',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: 'Method Not Allowed',
  },
  CONFLICT: {
    status: 409,
    message: 'Conflict',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
  },
};

export function createApiResponse<T>(
  type: keyof typeof apiResponseType,
  details: Partial<IApiResponse<T>> & Pick<IApiResponse<T>, 'data'>,
) {
  return {
    status: apiResponseType[type].status,
    message: apiResponseType[type].message,
    ...details,
  };
}
