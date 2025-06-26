import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffUser } from '../../../../../core/interfaces';
import {
  GlobalLoadingBarService,
  StaffUsersService,
} from '../../../../../core/services';

export const updateMemberResolver: ResolveFn<StaffUser> = (route, state) => {
  const globalLoadingBar = inject(GlobalLoadingBarService);
  const staffUsersService = inject(StaffUsersService);
  const id = route.paramMap.get('id')!;

  return new Observable<StaffUser>((observer) => {
    globalLoadingBar.startLoading();
    const sub = staffUsersService.getUserById(id).subscribe({
      next: (res) => {
        if (!res) {
          observer.error(new Error('Staff member not found'));
          globalLoadingBar.stopLoading();
          return;
        }
        observer.next(res);
        observer.complete();
        globalLoadingBar.stopLoading();
      },
      error: (err) => {
        observer.error(err);
        globalLoadingBar.stopLoading();
      },
    });

    return () => {
      sub.unsubscribe();
      globalLoadingBar.stopLoading();
    };
  });
};
