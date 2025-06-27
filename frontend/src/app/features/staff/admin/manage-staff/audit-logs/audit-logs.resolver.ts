import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import { StaffActivityLog, StaffUser } from '../../../../../core/interfaces';
import {
  AlertService,
  GlobalLoadingBarService,
  StaffService,
} from '../../../../../core/services';

export const auditLogsResolver: ResolveFn<{
  user: StaffUser | null;
  logs: StaffActivityLog[];
  totalCount: number;
}> = (route) => {
  const id = route.paramMap.get('id')!;
  const staffService = inject(StaffService);
  const alertService = inject(AlertService);
  const globalLoadingBar = inject(GlobalLoadingBarService);

  globalLoadingBar.stopLoading();

  return forkJoin({
    user: staffService.getUserById(id),
    logsData: staffService.getActivityLogs(id),
  }).pipe(
    catchError((error) => {
      alertService.error(`Failed to load activity logs: ${error.message}`);
      return of({ user: null, logsData: { logs: [], totalCount: 0 } });
    }),
    map(({ user, logsData }) => {
      return {
        user,
        ...logsData,
      };
    }),
    finalize(() => {
      globalLoadingBar.stopLoading();
    })
  );
};
