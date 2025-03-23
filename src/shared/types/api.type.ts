export interface IApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

export interface IErrorResponse {
  message: string;
}
