import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, StaffUser } from '../interfaces';

interface AuthState {
  customer: Customer | null;
  staff: StaffUser | null;
  accessToken: string | null;
}

interface AuthResponse {
  user: Customer | StaffUser;
  accessToken: string;
}

const DEFAULT_AUTH = {
  accessToken: null,
  customer: null,
  staff: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private auth: WritableSignal<AuthState> = signal(DEFAULT_AUTH);

  getAuth() {
    return this.auth();
  }

  setAuth(auth: AuthState) {
    this.auth.set(auth);
  }

  updateAuth(updateFn: (auth: AuthState) => AuthState) {
    this.auth.update(updateFn);
  }

  refreshStaffAuth() {
    return new Observable<AuthState>((observer) => {
      const subscription = this.http
        .post<AuthResponse>(`/auth/staff/refresh`, {})
        .subscribe({
          next: (res) => {
            const auth: AuthState = {
              staff: res.user as StaffUser,
              accessToken: res.accessToken,
              customer: this.auth().customer,
            };
            this.setAuth(auth);
            observer.next(auth);
            observer.complete();
          },
          error: (error) => {
            this.setAuth(DEFAULT_AUTH);
            observer.error(error);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  refreshCustomerAuth() {
    return new Observable<AuthState>((observer) => {
      const subscription = this.http
        .post<AuthResponse>(`/auth/staff/refresh`, {})
        .subscribe({
          next: (res) => {
            const auth: AuthState = {
              customer: res.user as Customer,
              accessToken: res.accessToken,
              staff: this.auth().staff,
            };
            this.setAuth(auth);
            observer.next(auth);
            observer.complete();
          },
          error: (error) => {
            this.setAuth(DEFAULT_AUTH);
            observer.error(error);
          },
        });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  staffLogin(username: string, password: string) {
    return new Observable<StaffUser>((observer) => {
      const subscription = this.http
        .post<AuthResponse>(`/auth/staff/login`, { username, password })
        .subscribe({
          next: (res) => {
            this.setAuth({
              staff: res.user as StaffUser,
              accessToken: res.accessToken,
              customer: this.auth().customer,
            });
            observer.next(res.user as StaffUser);
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

  customerLogin(phone: string) {
    return new Observable<Customer>((observer) => {
      const subscription = this.http
        .post<AuthResponse>(`/auth/customer/login`, { phone })
        .subscribe({
          next: (res) => {
            this.setAuth({
              customer: res.user as Customer,
              accessToken: res.accessToken,
              staff: this.auth().staff,
            });
            observer.next(res.user as Customer);
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
      const subscription = this.http.post<void>(`/auth/signout`, {}).subscribe({
        next: () => {
          this.setAuth(DEFAULT_AUTH);
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
