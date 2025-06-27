import { StaffUser } from './staff-user';

export interface StaffActivityLog {
  id: string;
  staffMemberId: string;
  staffMember?: StaffUser;
  activity: string;
  createdAt: Date;
}
