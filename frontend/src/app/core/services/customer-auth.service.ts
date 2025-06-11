import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces';
import { AuthState, BaseAuthService } from './base-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService extends BaseAuthService<Customer> {
  refresh() {
    return this._refresh('customer');
  }

  login(phone: string) {
    return new Observable<AuthState<Customer>>((observer) => {
      const subscription = this.http
        .post<AuthState<Customer>>(`/auth/customer/login`, { phone })
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

  logout() {
    return new Observable<void>((observer) => {
      const subscription = this.http
        .post<void>(`/auth/customer/logout`, {})
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
