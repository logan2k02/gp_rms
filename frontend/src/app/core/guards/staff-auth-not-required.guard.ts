import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService, LoggerService, StaffService } from '../services';
import { StaffRoleUtils } from '../utils';

export const staffAuthNotRequiredGuard: () => CanActivateFn = () => () => {
  const staffService = inject(StaffService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (staffService.auth) {
    logger.warn(
      'authNotRequiredGuard',
      'User is already authenticated, redirecting...'
    );
    alertService.error('You are already logged in.');

    router.navigateByUrl(
      '/staff/' + StaffRoleUtils.getEndpointName(staffService.auth.user.role)
    );
    return false;
  }

  return true;
};
