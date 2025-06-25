import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getEndpointNameForRole } from '../enums';
import { AlertService, LoggerService, StaffUsersService } from '../services';

export const staffAuthNotRequiredGuard: () => CanActivateFn = () => () => {
  const staffUsersService = inject(StaffUsersService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (staffUsersService.auth) {
    logger.warn(
      'authNotRequiredGuard',
      'User is already authenticated, redirecting...'
    );
    alertService.error('You are already logged in.');

    router.navigateByUrl(
      '/staff/' + getEndpointNameForRole(staffUsersService.auth.user.role)
    );
    return false;
  }

  return true;
};
