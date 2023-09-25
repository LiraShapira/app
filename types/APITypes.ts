export interface SuccessApiResponse<T> {
  data: T;
  status: number;
}

export type ApiResponse<T> = SuccessApiResponse<T> | Error
