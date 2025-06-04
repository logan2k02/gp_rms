import { applyDecorators, UseGuards } from '@nestjs/common';
import { DeveloperAuthGuard } from '../guards';

export const AllowOnlyDeveloper = () =>
  applyDecorators(UseGuards(DeveloperAuthGuard));
