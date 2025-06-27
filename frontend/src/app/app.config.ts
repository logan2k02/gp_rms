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
import { CustomersService, LoggerService, StaffService } from './core/services';
import { AppTitleStrategy } from './core/strategies';

const initAuth = () => {
  const staffService = inject(StaffService);
  const customersService = inject(CustomersService);
  const logger = inject(LoggerService);

  const staffAction = staffService.refresh().pipe(
    catchError((err) => {
      logger.warn(
        'AppInitializer',
        'Error during staff auth initialization:',
        err
      );
      return of(null);
    })
  );

  const customerAction = customersService.refresh().pipe(
    catchError((err) => {
      logger.warn(
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
