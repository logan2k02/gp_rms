import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { CommonError } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private snackBar = inject(MatSnackBar);

  success(message: string, duration = environment.defaultAlertTimeout) {
    this.openSnackBar(message, ['alert-success'], duration);
  }

  error(
    error: string | CommonError,
    duration = environment.defaultAlertTimeout
  ) {
    let message: string;
    if (typeof error === 'string') {
      message = error;
    } else {
      message = `${error.title} - ${error.message}`;
    }
    this.openSnackBar(message, ['alert-error'], duration);
  }

  warning(
    message: string,
    duration: number = environment.defaultAlertTimeout
  ): void {
    this.openSnackBar(message, ['alert-warning'], duration);
  }

  private openSnackBar(
    message: string,
    panelClass: string[],
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass,
      politeness: 'assertive',
    };
    this.snackBar.open(message, 'OK', config);
  }
}
