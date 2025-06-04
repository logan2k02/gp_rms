import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { routes } from './app.routes';
import { HttpInterceptor } from './core/inteceptors';
import { AuthService, LoggerService } from './core/services';
import { AppTitleStrategy } from './core/strategies';

const initAuth = () => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  const isStaff = window.location.pathname.startsWith('/staff');

  const action = isStaff
    ? authService.refreshStaffAuth()
    : authService.refreshCustomerAuth();
  return action.pipe(
    catchError((err) => {
      logger.error('AppInitializer', 'Error during auth initialization:', err);
      return of(null);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([HttpInterceptor])),
    provideAppInitializer(initAuth),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
