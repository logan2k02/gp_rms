import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { StaffRole } from '@prisma/client';
import { StaffMemberJwtGuard } from '../guards';

export const AllowOnlyStaffMembers = (...roles: StaffRole[]) =>
  applyDecorators(
    SetMetadata('allowedStaffRoles', roles),
    UseGuards(StaffMemberJwtGuard),
  );

// Empty roles array means all staff members are allowed
