import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getEndpointNameForRole } from '../enums';
import { AlertService, LoggerService, StaffAuthService } from '../services';

export const staffAuthNotRequiredGuard: () => CanActivateFn = () => () => {
  const authService = inject(StaffAuthService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (authService.auth) {
    logger.warn(
      'authNotRequiredGuard',
      'User is already authenticated, redirecting...'
    );
    alertService.error('You are already logged in.');

    router.navigateByUrl(
      '/staff/' + getEndpointNameForRole(authService.auth.user.role)
    );
    return false;
  }

  return true;
};
