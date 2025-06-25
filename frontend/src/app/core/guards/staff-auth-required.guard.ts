import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getEndpointNameForRole, StaffRole } from '../enums';
import { AlertService, LoggerService, StaffUsersService } from '../services';

export const staffAuthRequiredGuard =
  (...roles: StaffRole[]): CanActivateFn =>
  () => {
    const staffUsersService = inject(StaffUsersService);
    const logger = inject(LoggerService);
    const router = inject(Router);
    const alertService = inject(AlertService);

    if (!staffUsersService.auth) {
      logger.warn(
        'authRequiredGuard',
        'User is not authenticated, redirecting to login page'
      );
      alertService.error('You must be logged in to access this page.');

      router.navigateByUrl('/staff/login');
      return false;
    }

    if (!roles.includes(staffUsersService.auth.user.role)) {
      logger.warn(
        'authRequiredGuard',
        'User does not have permission to access that page',
        {
          allowed: roles,
          role: staffUsersService.auth.user.role,
        }
      );
      alertService.error('You do not have permission to access that page.');

      router.navigateByUrl(
        '/staff/' + getEndpointNameForRole(staffUsersService.auth.user.role)
      );
      return false;
    }

    return true;
  };
