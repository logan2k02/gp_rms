import { Customer, StaffMember } from '@prisma/client';

export interface RequestAuth<T extends StaffMember | Customer> {
  user: T | null;
  refreshToken: string | null;
}
