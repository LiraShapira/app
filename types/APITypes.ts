export type ApiResponse<T> = {
  data: T;
  status: number;
} |
{
  message: string;
  stack: string;
}
