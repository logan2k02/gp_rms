import { HttpClient } from '@angular/common/http';
import { inject, signal, WritableSignal } from '@angular/core';

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
}
