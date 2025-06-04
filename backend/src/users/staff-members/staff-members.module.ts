import { Module } from '@nestjs/common';
import { StaffMembersController } from './staff-members.controller';
import { StaffMembersService } from './staff-members.service';

@Module({
  controllers: [StaffMembersController],
  providers: [StaffMembersService],
})
export class StaffMembersModule {}
