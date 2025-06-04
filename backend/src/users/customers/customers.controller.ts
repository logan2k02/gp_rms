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

import { Customer, StaffRole } from '@prisma/client';
import {
  AllowOnlyCustomers,
  AllowOnlyStaffMembers,
  CustomerAuthFromRequest,
} from 'src/auth/decorators';
import { RequestAuth } from 'src/auth/interfaces';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Post('accounts')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Get('accounts')
  findAll() {
    return this.customersService.findAll();
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Get('accounts/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Patch('/accounts/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @AllowOnlyStaffMembers(StaffRole.Admin)
  @Delete('accounts/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }

  // create profile is in auth module under register-customer endpoint

  @AllowOnlyCustomers()
  @Get('profile')
  getProfile(@CustomerAuthFromRequest() auth: RequestAuth<Customer>) {
    return this.customersService.findOne(auth.user?.id!);
  }

  @AllowOnlyCustomers()
  @Patch('profile')
  updateProfile(
    @CustomerAuthFromRequest() auth: RequestAuth<Customer>,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(auth.user?.id!, updateCustomerDto);
  }

  @AllowOnlyCustomers()
  @Delete('profile')
  removeProfile(@CustomerAuthFromRequest() auth: RequestAuth<Customer>) {
    return this.customersService.remove(auth.user?.id!);
  }
}
