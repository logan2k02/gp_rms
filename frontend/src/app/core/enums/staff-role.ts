export enum StaffRole {
  Admin = 'Admin',
  Cashier = 'Cashier',
  Waiter = 'Waiter',
  KitchenManager = 'KitchenManager',
}

export const getEndpointNameForRole = (role: StaffRole): string => {
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
};
