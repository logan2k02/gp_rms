import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { RequestAuth } from '../interfaces';

export const CustomerAuthFromRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RequestAuth<Customer> => {
    const request = ctx.switchToHttp().getRequest();

    return {
      user: request.user ?? null,
      refreshToken: request.cookies[`customerRefreshToken`] ?? null,
    };
  },
);
