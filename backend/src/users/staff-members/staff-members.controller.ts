import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StaffMember, StaffRole } from '@prisma/client';
import {
  AllowOnlyDeveloper,
  AllowOnlyStaffMembers,
  StaffMemberAuthFromRequest,
} from 'src/auth/decorators';
import { RequestAuth } from 'src/auth/interfaces';
import { PaginationParam } from 'src/common/decorators';
import { Pagination } from 'src/common/interfaces';
import { CreateStaffMemberDto, UpdateStaffMemberDto } from './dto';
import { StaffMembersService } from './staff-members.service';

@Controller('staff-members')
export class StaffMembersController {
  constructor(private readonly staffMembersService: StaffMembersService) {}

  @AllowOnlyDeveloper()
  @Post('super-user')
  createSuperUser() {
    return this.staffMembersService.create({
      name: 'Super User',
      password: '123456',
      role: StaffRole.Admin,
      username: 'admin',
    });
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Post('accounts')
  create(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
  ) {
    return this.staffMembersService.create(createStaffMemberDto, auth.user?.id);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Get('accounts')
  findAll() {
    return this.staffMembersService.findAll();
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Get('accounts/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffMembersService.findOne(id);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Patch('accounts/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffMemberDto: UpdateStaffMemberDto,
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
  ) {
    return this.staffMembersService.update(
      id,
      updateStaffMemberDto,
      auth.user?.id,
    );
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Delete('accounts/:id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
  ) {
    return this.staffMembersService.remove(id, auth.user?.id);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Get('accounts/:id/activity-logs')
  getActivityLogs(
    @Param('id', ParseIntPipe) id: number,
    @PaginationParam() pagination: Pagination,
  ) {
    console.log(pagination);

    return this.staffMembersService.getActivityLogs(id, pagination);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Delete('accounts/:id/activity-logs')
  clearActivityLogs(
    @Param('id', ParseIntPipe) id: number,
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
  ) {
    return this.staffMembersService.clearActivityLogs(id, auth.user?.id);
  }

  // @AllowOnlyStaffMembers()
  // @Get('profile')
  // getProfile(@StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>) {
  //   return this.staffMembersService.findOne(auth.user?.id!);
  // }

  // @AllowOnlyStaffMembers()
  // @Patch('profile')
  // updateProfile(
  //   @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
  //   @Body() updateStaffMemberDto: UpdateStaffMemberDto,
  // ) {
  //   return this.staffMembersService.update(
  //     auth.user?.id!,
  //     updateStaffMemberDto,
  //     auth.user?.id!,
  //   );
  // }

  // @AllowOnlyStaffMembers()
  // @Delete('profile')
  // removeProfile(@StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>) {
  //   return this.staffMembersService.remove(auth.user?.id!);
  // }
}
