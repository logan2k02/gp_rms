import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from 'src/users/customers/customers.module';
import { CustomersService } from 'src/users/customers/customers.service';
import { StaffMembersModule } from 'src/users/staff-members/staff-members.module';
import { StaffMembersService } from 'src/users/staff-members/staff-members.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerJwtStrategy, StaffMemberJwtStrategy } from './strategies';

@Module({
  imports: [CustomersModule, StaffMembersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    StaffMembersService,
    CustomersService,
    AuthService,
    CustomerJwtStrategy,
    StaffMemberJwtStrategy,
  ],
})
export class AuthModule {}
