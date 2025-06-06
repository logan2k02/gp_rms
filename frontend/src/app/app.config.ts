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
import { catchError, combineLatest, of } from 'rxjs';
import { routes } from './app.routes';
import { HttpInterceptor } from './core/inteceptors';
import {
  CustomerAuthService,
  LoggerService,
  StaffAuthService,
} from './core/services';
import { AppTitleStrategy } from './core/strategies';

const initAuth = () => {
  const staffAuthService = inject(StaffAuthService);
  const customerAuthService = inject(CustomerAuthService);
  const logger = inject(LoggerService);

  const staffAction = staffAuthService.refresh().pipe(
    catchError((err) => {
      logger.error(
        'AppInitializer',
        'Error during staff auth initialization:',
        err
      );
      return of(null);
    })
  );

  const customerAction = customerAuthService.refresh().pipe(
    catchError((err) => {
      logger.error(
        'AppInitializer',
        'Error during customer auth initialization:',
        err
      );
      return of(null);
    })
  );

  return combineLatest([staffAction, customerAction]);
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
