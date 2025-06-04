import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Res,
} from '@nestjs/common';
import { Customer, StaffMember } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CustomerAuthFromRequest } from './decorators/customer-auth-from-request.decorator';
import { StaffMemberAuthFromRequest } from './decorators/staff-member-auth-from-request.decorator';
import { CustomerSendOtpDto, CustomerVerifyOtpDto, StaffLoginDto } from './dto';
import { RequestAuth } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private logout(res: Response, type: 'customer' | 'staffMember') {
    res.clearCookie(`${type}refreshToken`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  private refresh(
    auth: RequestAuth<any>,
    res: Response,
    userType: 'customer' | 'staffMember',
  ) {
    if (!auth.refreshToken) {
      throw new ForbiddenException('Refresh token not found in request');
    }

    try {
      return this.authService.refresh(auth.refreshToken, userType);
    } catch (error) {
      // If the refresh token is invalid, clear the cookie and throw the error
      res.clearCookie(`${userType}RefreshToken`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      throw error;
    }
  }

  @Post('staff/login')
  async staffLogin(
    @Body() dto: StaffLoginDto,
    @Ip() ipAddress: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.staffLogin(dto, ipAddress);

    res.cookie('staffMemberRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
    });

    return { accessToken, user };
  }

  @Post('staff/refresh')
  refreshStaff(
    @StaffMemberAuthFromRequest() auth: RequestAuth<StaffMember>,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.refresh(auth, res, 'staffMember');
  }

  @HttpCode(HttpStatus.OK)
  @Post('staff/logout')
  staffLogout(@Res({ passthrough: true }) res: Response) {
    this.logout(res, 'staffMember');
  }

  @Post('customer/send-otp')
  async customerSendOtp(@Body() dto: CustomerSendOtpDto) {
    return this.authService.customerSendOTP(dto);
  }

  @Post('customer/verify-otp')
  async customerVerifyOtp(
    @Body() dto: CustomerVerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const { accessToken, refreshToken, user } =
    //   await this.authService.customerVerifyOTP(dto);
    // res.cookie('customerRefreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
    // });
    // return { accessToken, user };
  }

  @Post('customer/refresh')
  async customerRefresh(
    @CustomerAuthFromRequest() auth: RequestAuth<Customer>,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.refresh(auth, res, 'customer');
  }

  @HttpCode(HttpStatus.OK)
  @Post('customer/logout')
  customerLogout(@Res({ passthrough: true }) res: Response) {
    this.logout(res, 'customer');
  }
}
