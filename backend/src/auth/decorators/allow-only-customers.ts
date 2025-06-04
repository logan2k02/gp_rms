import { applyDecorators, UseGuards } from '@nestjs/common';
import { CustomerJwtGuard } from '../guards';

export const AllowOnlyCustomers = () =>
  applyDecorators(UseGuards(CustomerJwtGuard));
