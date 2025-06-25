import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffUser } from '../interfaces';
import { AuthState, BaseAuthService } from './base-auth.service';

@Injectable({
  providedIn: 'root',
})
export class StaffUsersService extends BaseAuthService<StaffUser> {
  refresh() {
    return this._refresh('staff');
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

  getAllUsers(): Observable<StaffUser[]> {
    return this.http.get<StaffUser[]>(`/staff-members/accounts`);
  }

  getUserById(id: string): Observable<StaffUser | null> {
    return this.http.get<StaffUser | null>(`/staff-members/accounts/${id}`);
  }

  createUser(user: StaffUser): Observable<StaffUser> {
    return this.http.post<StaffUser>(`/staff-members/accounts`, user);
  }

  updateUser(user: StaffUser): Observable<StaffUser> {
    return this.http.put<StaffUser>(`/staff-members/accounts/${user.id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/staff-members/accounts/${id}`);
  }
}
