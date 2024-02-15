import { HttpStatus } from '@nestjs/common';

export interface OkResponse<T> {
  status_code: number;
  data: T;
  message: string;
}

export const okTransform = <T>(
  data: T,
  message = 'Success',
  status_code: number = HttpStatus.OK,
): OkResponse<T> => {
  return {
    status_code,
    data,
    message,
  };
};
