import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StaffMember, StaffRole } from '@prisma/client';
import {
  AllowOnlyDeveloper,
  AllowOnlyStaffMembers,
  StaffMemberAuthFromRequest,
} from 'src/auth/decorators';
import { RequestAuth } from 'src/auth/interfaces';
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
  create(@Body() createStaffMemberDto: CreateStaffMemberDto) {
    return this.staffMembersService.create(createStaffMemberDto);
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
  @Put('accounts/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffMemberDto: UpdateStaffMemberDto,
  ) {
    return this.staffMembersService.update(id, updateStaffMemberDto);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Delete('accounts/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffMembersService.remove(id);
  }

  @AllowOnlyStaffMembers()
  @Get('profile')
  getProfile(@StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>) {
    return this.staffMembersService.findOne(auth.user?.id!);
  }

  @AllowOnlyStaffMembers()
  @Put('profile')
  updateProfile(
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
    @Body() updateStaffMemberDto: UpdateStaffMemberDto,
  ) {
    return this.staffMembersService.update(
      auth.user?.id!,
      updateStaffMemberDto,
    );
  }

  @AllowOnlyStaffMembers()
  @Delete('profile')
  removeProfile(@StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>) {
    return this.staffMembersService.remove(auth.user?.id!);
  }
}
