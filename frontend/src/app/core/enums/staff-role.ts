export enum StaffRole {
  Admin = 'Admin',
  Cashier = 'Cashier',
  Waiter = 'Waiter',
  KitchenManager = 'KitchenManager',
}

class StaffRoleUtils {
  static getRoles(): StaffRole[] {
    return Object.values(StaffRole);
  }

  static isValidRole(role: string): boolean {
    return Object.values(StaffRole).includes(role as StaffRole);
  }

  getEndpointName(role: StaffRole): string {
    switch (role) {
      case StaffRole.Admin:
        return 'admin';
      case StaffRole.Cashier:
        return 'cashier';
      case StaffRole.Waiter:
        return 'waiter';
      case StaffRole.KitchenManager:
        return 'kitchen-manager';
    }
  }

  getName(role: StaffRole): string {
    switch (role) {
      case StaffRole.Admin:
        return 'Admin';
      case StaffRole.Cashier:
        return 'Cashier';
      case StaffRole.Waiter:
        return 'Waiter';
      case StaffRole.KitchenManager:
        return 'Kitchen Manager';
    }
  }
}
