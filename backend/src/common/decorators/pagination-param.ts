import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Pagination as IPagination } from '../interfaces';

export const PaginationParam = createParamDecorator<IPagination>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = request.query.page ? Number(request.query.page) : 1;
    const pageSize = request.query.pageSize
      ? Number(request.query.pageSize)
      : 10;
    return { page, pageSize };
  },
);
