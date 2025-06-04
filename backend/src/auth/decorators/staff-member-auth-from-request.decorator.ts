import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StaffMember } from '@prisma/client';
import { RequestAuth } from '../interfaces';

export const StaffMemberAuthFromRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RequestAuth<StaffMember> => {
    const request = ctx.switchToHttp().getRequest();

    return {
      user: request.user ?? null,
      refreshToken: request.cookies[`staffMemberRefreshToken`] ?? null,
    };
  },
);
