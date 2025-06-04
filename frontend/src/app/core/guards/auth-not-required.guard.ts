import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getEndpointNameForRole } from '../enums';
import { AlertService, AuthService, LoggerService } from '../services';

export const authNotRequiredGuard: () => CanActivateFn = () => () => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  const auth = authService.getAuth();

  if (auth.customer || auth.staff) {
    logger.warn(
      'authNotRequiredGuard',
      'User is already authenticated, redirecting...'
    );
    alertService.error('You are already logged in.');

    if (auth.staff) {
      router.navigateByUrl('/staff/' + getEndpointNameForRole(auth.staff.role));
    } else {
      router.navigateByUrl('/');
    }
    return false;
  }

  return true;
};
