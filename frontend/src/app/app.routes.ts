import { Routes } from '@angular/router';
import { StaffRole } from './core/enums';
import {
  staffAuthNotRequiredGuard,
  staffAuthRequiredGuard,
} from './core/guards';
import { membersListResolver } from './features/staff/admin/manage-staff/members-list/members-list.resolver';
import { updateMemberResolver } from './features/staff/admin/manage-staff/update-member/update-member.resolver';

export const routes: Routes = [
  // Customer Routes
  {
    path: '',
    loadComponent: () =>
      import('./features/customer/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/customer/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'reserve',
        loadComponent: () =>
          import(
            './features/customer/reserve-table/reserve-table.component'
          ).then((m) => m.ReserveTableComponent),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./features/customer/menu/menu.component').then(
            (m) => m.MenuComponent
          ),
      },
      {
        path: 'info',
        loadComponent: () =>
          import('./features/customer/info/info.component').then(
            (m) => m.InfoComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/customer/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
  // Staff Routes
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
        canActivate: [staffAuthNotRequiredGuard()],
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
          {
            path: 'manage-staff',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './features/staff/admin/manage-staff/members-list/members-list.component'
                  ).then((m) => m.MembersListComponent),
                resolve: {
                  membersList: membersListResolver,
                },
              },
              {
                path: 'new',
                loadComponent: () =>
                  import(
                    './features/staff/admin/manage-staff/new-member/new-member.component'
                  ).then((m) => m.NewMemberComponent),
              },
              {
                path: 'update/:id',
                loadComponent: () =>
                  import(
                    './features/staff/admin/manage-staff/update-member/update-member.component'
                  ).then((m) => m.UpdateMemberComponent),
                resolve: {
                  user: updateMemberResolver,
                },
              },
              {
                path: 'audit-logs/:id',
                loadComponent: () =>
                  import(
                    './features/staff/admin/manage-staff/audit-logs/audit-logs.component'
                  ).then((m) => m.AuditLogsComponent),
              },
            ],
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
        // canActivate: [staffAuthRequiredGuard(StaffRole.KitchenManager)],
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/home/home.component'
              ).then((m) => m.HomeComponent),
          },
          {
            path: 'archived-orders',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/home/home.component'
              ).then((m) => m.HomeComponent),
          },
          {
            path: 'meals',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/meals/meals.component'
              ).then((m) => m.MealsComponent),
          },
          {
            path: 'meal-item',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/meal-item/meal-item.component'
              ).then((m) => m.MealItemComponent),
          },
          {
            path: 'ingredients',
            loadComponent: () =>
              import(
                './features/staff/kitchen-manager/ingredients/ingredients.component'
              ).then((m) => m.IngredientsComponent),
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
