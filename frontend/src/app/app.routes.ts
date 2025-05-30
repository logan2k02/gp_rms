import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('./features/staff/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
