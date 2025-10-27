export interface SuccessApiResponse<T> {
  data: T;
  status: number;
}

export interface ErrorApiResponse {
  data: null;
  status: number;
  error: string;
}

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse
