import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffUser } from '../interfaces';
import { AuthState, BaseAuthService } from './base-auth.service';

@Injectable({
  providedIn: 'root',
})
export class StaffAuthService extends BaseAuthService<StaffUser> {
  refresh() {
    return new Observable<AuthState<StaffUser>>((observer) => {
      const subscription = this.http
        .post<AuthState<StaffUser>>(`/auth/staff/refresh`, {})
        .subscribe({
          next: (res) => {
            this.auth = res;
            observer.next(res);
            observer.complete();
          },
          error: (error) => {
            this.auth = null;
            observer.error(error);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  login(username: string, password: string) {
    return new Observable<AuthState<StaffUser>>((observer) => {
      const subscription = this.http
        .post<AuthState<StaffUser>>(`/auth/staff/login`, { username, password })
        .subscribe({
          next: (res) => {
            this.auth = res;
            observer.next(res);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  logout() {
    return new Observable<void>((observer) => {
      const subscription = this.http
        .post<void>(`/auth/staff/logout`, {})
        .subscribe({
          next: () => {
            this.auth = null;
            observer.next();
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
