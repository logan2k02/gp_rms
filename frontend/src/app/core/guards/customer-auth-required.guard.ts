import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService, AuthService, LoggerService } from '../services';

export const customerAuthRequiredGuard: () => CanActivateFn = () => () => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  const auth = authService.getAuth();

  if (!auth.customer) {
    logger.warn(
      'authRequiredGuard',
      'Customer is not authenticated, redirecting to login page'
    );
    alertService.error('You must be logged in to access this page.');

    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
