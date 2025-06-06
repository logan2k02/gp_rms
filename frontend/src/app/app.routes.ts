import { Routes } from '@angular/router';
import { StaffRole } from './core/enums';
import { authNotRequiredGuard, staffAuthRequiredGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('./features/staff/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/staff/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [authNotRequiredGuard()],
      },
      {
        path: 'admin',
        canActivate: [staffAuthRequiredGuard(StaffRole.Admin)],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/staff/admin/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },
      {
        path: 'cashier',
        canActivate: [staffAuthRequiredGuard(StaffRole.Cashier)],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/staff/cashier/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },
      {
        path: 'kitchen-manager',
        canActivate: [staffAuthRequiredGuard(StaffRole.KitchenManager)],
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/home/home.component'
              ).then((m) => m.HomeComponent),
          },
        ],
      },
      {
        path: 'waiter',
        canActivate: [staffAuthRequiredGuard(StaffRole.Waiter)],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/staff/waiter/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },
    ],
  },
];
