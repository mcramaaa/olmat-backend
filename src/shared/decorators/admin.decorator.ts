import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionAdmin = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log(data);

    return data ? user?.[data] : user;
  },
);
