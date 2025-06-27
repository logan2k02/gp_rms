import { StaffRole } from '../enums';

export interface StaffUser {
  id: string;
  username: string;
  name: string;
  role: StaffRole;
  passwordHash?: string;
  password?: string;
}
