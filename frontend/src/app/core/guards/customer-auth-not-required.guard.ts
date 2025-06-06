import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService, CustomerAuthService, LoggerService } from '../services';

export const customerAuthNotRequiredGuard: () => CanActivateFn = () => () => {
  const authService = inject(CustomerAuthService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (authService.auth) {
    logger.warn(
      'authNotRequiredGuard',
      'User is already authenticated, redirecting...'
    );
    alertService.error('You are already logged in.');

    router.navigateByUrl('/');
    return false;
  }

  return true;
};
