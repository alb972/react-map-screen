export type APIResult<T> = APISuccess<T> | APIError;

interface APISuccess<T> {
  type: "success";
  value: T;
}

interface APIError {
  type: "error";
  code: string;
  error: string;
}
