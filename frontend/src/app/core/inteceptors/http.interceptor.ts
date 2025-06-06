import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonError, Customer, StaffUser } from '../interfaces';
import {
  AlertService,
  CustomerAuthService,
  LoggerService,
  StaffAuthService,
} from '../services';
import { AuthState } from '../services/base-auth.service';

const getErrorDetails = (err: any): CommonError => {
  const defaultMessage =
    'Reason for error is unknown. This could be a bug. Please contact support if this error persists.';
  let title = 'Unknown Error';
  let message = defaultMessage;

  let statusCode = 500;
  if (err instanceof HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
      title = 'Client Error';
      statusCode = err.status;
    } else {
      message = err.error.message || err.statusText;
      title = err.error.error || 'Server Error';
      statusCode = err.status;
    }
  } else {
    message = err.message || err.toString();
    statusCode = err.status || 500;
  }
  if (Array.isArray(err.message)) {
    message = err.message.join(', ');
  } else if (typeof err.message === 'object') {
    message = JSON.stringify(err.message, null, 2);
  }

  return {
    // title: title || 'Unknown Error',
    message: message || defaultMessage,
    statusCode: statusCode || 500,
  };
};

export const HttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const staffAuthService = inject(StaffAuthService);
  const customerAuthService = inject(CustomerAuthService);
  const alertService = inject(AlertService);
  const logger = inject(LoggerService);

  const isStaff = request.url.startsWith('/staff');

  // update base url for all requests
  let req = request;
  if (!req.url.startsWith('http')) {
    const baseUrl = environment.backendUrl;
    const url = req.url.startsWith('/') ? req.url : '/' + req.url;
    const newReq = req.clone({ url: `${baseUrl}${url}` });
    req = newReq;
  }

  // attach auth token to all requests
  let authReq = req.clone({
    withCredentials: true,
  });
  const auth = isStaff ? staffAuthService.auth : customerAuthService.auth;
  if (auth) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `bearer ${auth.accessToken}`,
      },
    });
  }

  // handle errors
  return next(authReq).pipe(
    catchError((err) => {
      if (
        !authReq.url.endsWith('/login') &&
        err instanceof HttpErrorResponse &&
        err.status === 401
      ) {
        logger.info(
          'HttpAuthInterceptor',
          '401 error detected. Trying to refresh token...'
        );
        const action = isStaff
          ? staffAuthService.refresh()
          : customerAuthService.refresh();
        // refresh token
        return (action as Observable<AuthState<Customer | StaffUser>>).pipe(
          switchMap((newAuth) => {
            logger.info(
              'HttpAuthInterceptor',
              'Token refreshed. Retrying request...'
            );

            return next(
              authReq.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAuth.accessToken}`,
                },
              })
            );
          }),
          catchError((err) => {
            logger.error('HttpAuthInterceptor', 'refreshToken() failed');
            let navigationUrl = (isStaff ? '/staff' : '') + '/login';
            router.navigateByUrl(navigationUrl);

            // show alert only on staff attempts
            if (isStaff)
              alertService.error('Your session is expired. Please login.');

            return throwError(() => getErrorDetails(err));
          })
        );
      }
      return throwError(() => getErrorDetails(err));
    })
  );
};
