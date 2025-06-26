import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import {
  getEndpointNameForRole,
  getNameForRole,
  StaffRole,
} from '../../../core/enums';
import { AlertService, StaffUsersService } from '../../../core/services';

interface NavLink {
  icon: string;
  title: string;
  link: string;
  matchExactly?: boolean;
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent extends BaseComponent {
  private staffUsersService = inject(StaffUsersService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  get user() {
    return this.staffUsersService.auth?.user;
  }

  get role() {
    return this.user ? getNameForRole(this.user.role) : 'Staff';
  }

  login() {
    this.router.navigate(['staff', 'login']);
  }

  logout() {
    this.sub$.sink = this.staffUsersService.logout().subscribe({
      next: () => {
        this.router.navigate(['staff', 'login']);
      },
      error: () => {
        this.alertService.error(
          'Failed to logout at the moment. Please try again later.'
        );
      },
    });
  }

  get navLinks(): NavLink[] {
    if (!this.user) {
      return [
        {
          icon: this.getAppIcon('login'),
          title: 'Login',
          link: '/login',
        },
      ];
    }

    const roleEndPoint = '/staff/' + getEndpointNameForRole(this.user.role);

    const links: NavLink[] = [];
    links.push({
      icon: this.getAppIcon('home'),
      title: 'Home',
      link: roleEndPoint,
      matchExactly: true,
    });

    switch (this.user.role) {
      case StaffRole.Admin:
        links.push(
          {
            icon: this.getAppIcon('staff'),
            title: 'Manage Staff',
            link: roleEndPoint + '/manage-staff',
          },
          {
            icon: this.getAppIcon('food_menu'),
            title: 'Menus',
            link: roleEndPoint + '/menus',
          },
          {
            icon: this.getAppIcon('meal'),
            title: 'Meals',
            link: roleEndPoint + '/meals',
          },
          {
            icon: this.getAppIcon('location'),
            title: 'Locations',
            link: roleEndPoint + '/locations',
          },
          {
            icon: this.getAppIcon('table'),
            title: 'Tables',
            link: roleEndPoint + '/tables',
          },
          {
            icon: this.getAppIcon('staff'),
            title: 'Waiters',
            link: roleEndPoint + '/waiters',
          },
          {
            icon: this.getAppIcon('promos'),
            title: 'Promos',
            link: roleEndPoint + '/promos',
          },
          {
            icon: this.getAppIcon('reports'),
            title: 'Sales',
            link: roleEndPoint + '/sales',
          }
        );
        break;

      case StaffRole.KitchenManager:
        links.push(
          {
            icon: this.getAppIcon('food_menu'),
            title: 'Menus',
            link: roleEndPoint + '/menus',
          },
          {
            icon: this.getAppIcon('meal'),
            title: 'Meals',
            link: roleEndPoint + '/meals',
          },
          {
            icon: this.getAppIcon('location'),
            title: 'Locations',
            link: roleEndPoint + '/locations',
          },
          {
            icon: this.getAppIcon('table'),
            title: 'Tables',
            link: roleEndPoint + '/tables',
          },
          {
            icon: this.getAppIcon('staff'),
            title: 'Waiters',
            link: roleEndPoint + '/waiters',
          },
          {
            icon: this.getAppIcon('promos'),
            title: 'Promos',
            link: roleEndPoint + '/promos',
          },
          {
            icon: this.getAppIcon('reports'),
            title: 'Sales',
            link: roleEndPoint + '/sales',
          }
        );
        break;
    }

    return links;
  }
}
