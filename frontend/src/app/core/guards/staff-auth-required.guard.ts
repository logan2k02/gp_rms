import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StaffRole } from '../enums';
import { AlertService, LoggerService, StaffService } from '../services';
import { StaffRoleUtils } from '../utils';

export const staffAuthRequiredGuard =
  (...roles: StaffRole[]): CanActivateFn =>
  () => {
    const staffService = inject(StaffService);
    const logger = inject(LoggerService);
    const router = inject(Router);
    const alertService = inject(AlertService);

    if (!staffService.auth) {
      logger.warn(
        'authRequiredGuard',
        'User is not authenticated, redirecting to login page'
      );
      alertService.error('You must be logged in to access this page.');

      router.navigateByUrl('/staff/login');
      return false;
    }

    if (!roles.includes(staffService.auth.user.role)) {
      logger.warn(
        'authRequiredGuard',
        'User does not have permission to access that page',
        {
          allowed: roles,
          role: staffService.auth.user.role,
        }
      );
      alertService.error('You do not have permission to access that page.');

      router.navigateByUrl(
        '/staff/' + StaffRoleUtils.getEndpointName(staffService.auth.user.role)
      );
      return false;
    }

    return true;
  };
