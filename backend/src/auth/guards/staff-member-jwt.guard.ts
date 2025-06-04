import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { StaffRole } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class StaffMemberJwtGuard extends AuthGuard('staff-member-jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedStaffRoles = this.reflector.get<StaffRole[] | undefined>(
      'allowedStaffRoles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    request.allowedStaffRoles = allowedStaffRoles ?? [];

    return super.canActivate(context);
  }
}
