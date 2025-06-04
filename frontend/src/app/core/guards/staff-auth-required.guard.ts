import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getEndpointNameForRole, StaffRole } from '../enums';
import { AlertService, AuthService, LoggerService } from '../services';

export const staffAuthRequiredGuard =
  (...roles: StaffRole[]): CanActivateFn =>
  () => {
    const authService = inject(AuthService);
    const logger = inject(LoggerService);
    const router = inject(Router);
    const alertService = inject(AlertService);

    const auth = authService.getAuth();

    if (!auth.staff) {
      logger.warn(
        'authRequiredGuard',
        'User is not authenticated, redirecting to login page'
      );
      alertService.error('You must be logged in to access this page.');

      router.navigateByUrl('/staff/login');
      return false;
    }

    if (!roles.includes(auth.staff.role)) {
      logger.warn(
        'authRequiredGuard',
        'User does not have permission to access that page',
        {
          allowed: roles,
          role: authService.getAuth().staff?.role,
        }
      );
      alertService.error('You do not have permission to access that page.');

      router.navigateByUrl('/staff/' + getEndpointNameForRole(auth.staff.role));
      return false;
    }

    return true;
  };
