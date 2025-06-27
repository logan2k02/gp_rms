import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffUser } from '../../../../../core/interfaces';
import {
  AlertService,
  GlobalLoadingBarService,
  StaffService,
} from '../../../../../core/services';

export const membersListResolver: ResolveFn<StaffUser[]> = (route, state) => {
  const staffService = inject(StaffService);
  const alertService = inject(AlertService);
  const globalLoadingBar = inject(GlobalLoadingBarService);

  return new Observable<StaffUser[]>((observer) => {
    globalLoadingBar.startLoading();
    const sub = staffService.getAllUsers().subscribe({
      next: (res) => {
        observer.next(res);
        observer.complete();
        globalLoadingBar.stopLoading();
      },
      error: (err) => {
        alertService.error(
          'Failed to load staff members. Please try again later.'
        );
        observer.next([]);
        observer.complete();
        globalLoadingBar.stopLoading();
      },
    });

    return () => {
      sub.unsubscribe();
      globalLoadingBar.stopLoading();
    };
  });
};
