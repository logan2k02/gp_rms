import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BaseComponent } from '../../../../../core/base.component';
import { StaffActivityLog, StaffUser } from '../../../../../core/interfaces';
import {
  AlertService,
  GlobalLoadingBarService,
  StaffService,
} from '../../../../../core/services';

@Component({
  selector: 'app-audit-logs',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.scss',
})
export class AuditLogsComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  private activatedRoute = inject(ActivatedRoute);
  private staffService = inject(StaffService);
  private alertService = inject(AlertService);
  private globalLoadingBar = inject(GlobalLoadingBarService);
  private router = inject(Router);

  user!: StaffUser | null;
  data: StaffActivityLog[] = [];
  totalCount = 0;

  readonly displayedColumns = ['createdAt', 'activity'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const { user, logs, totalCount } = this.activatedRoute.snapshot.data[
      'data'
    ] as {
      user: StaffUser | null;
      logs: StaffActivityLog[];
      totalCount: number;
    };

    this.data = logs;
    this.user = user;
    this.totalCount = totalCount;
  }

  ngAfterViewInit() {
    this.paginator.length = this.totalCount;
    if (this.totalCount < 10) {
      this.paginator.pageSizeOptions = [10];
    } else if (this.totalCount < 25) {
      this.paginator.pageSizeOptions = [10, 25];
    } else {
      this.paginator.pageSizeOptions = [10, 25, 50];
    }

    this.sub$.sink = this.paginator.page.subscribe((page) => {
      this.globalLoadingBar.startLoading();
      this.sub$.sink = this.staffService
        .getActivityLogs(this.user?.id || '', page.pageIndex, page.pageSize)
        .subscribe({
          next: ({ logs }) => {
            this.data = logs;
            this.globalLoadingBar.stopLoading();
          },
          error: (err) => {
            this.alertService.error(err);
            this.globalLoadingBar.stopLoading();
          },
        });
    });
  }

  clearLogs() {
    this.sub$.sink = this.alertService
      .confirm({
        title: 'Are you sure?',
        message: 'This will clear all activity logs for this user.',
        confirmButtonText: 'Yes, Clear',
        cancelButtonText: 'Cancel',
      })
      .pipe(filter((confirmed) => confirmed))
      .subscribe({
        next: () => {
          this.globalLoadingBar.startLoading();
          this.sub$.sink = this.staffService
            .clearActivityLogs(this.user?.id || '')
            .subscribe({
              next: () => {
                this.alertService.success(
                  'Activity logs cleared successfully.'
                );
                this.globalLoadingBar.stopLoading();
                this.router.navigate(['/staff/admin/manage-staff']);
              },
              error: (err) => {
                this.alertService.error(err);
                this.globalLoadingBar.stopLoading();
              },
            });
        },
      });
  }
}
