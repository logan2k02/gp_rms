import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService, CustomersService, LoggerService } from '../services';

export const customerAuthNotRequiredGuard: () => CanActivateFn = () => () => {
  const customersService = inject(CustomersService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (customersService.auth) {
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
