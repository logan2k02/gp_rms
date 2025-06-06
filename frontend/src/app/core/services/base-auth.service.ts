import { HttpClient } from '@angular/common/http';
import { inject, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthState<T> {
  user: T;
  accessToken: string;
}

export abstract class BaseAuthService<T> {
  protected http = inject(HttpClient);
  protected _auth: WritableSignal<AuthState<T> | null> = signal(null);

  get auth() {
    return this._auth();
  }

  set auth(newAuth: AuthState<T> | null) {
    this._auth.set(newAuth);
  }

  protected _refresh(endpoint: 'customer' | 'staff') {
    return new Observable<AuthState<T>>((observer) => {
      const subscription = this.http
        .post<AuthState<T> | null>(`/auth/${endpoint}/refresh`, {})
        .subscribe({
          next: (res) => {
            if (res) {
              this.auth = res;
              observer.next(res);
            }

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
}
