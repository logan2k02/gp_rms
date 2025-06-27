import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { CustomerSendOtpDto, CustomerVerifyOtpDto, StaffLoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private async createToken(payload: any, tokenType: string) {
    return await this.jwtService.signAsync(payload, {
      secret: this.config.get(`jwt.${tokenType}TokenSecret`)!,
      expiresIn: this.config.get(`jwt.${tokenType}TokenExpiresIn`)!,
    });
  }

  async staffLogin(dto: StaffLoginDto, ipAddress: string) {
    const user = await this.db.staffMember.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Unable to find a staff member with that username',
      );
    }

    const passwordOkay = await argon.verify(user.passwordHash, dto.password);
    if (!passwordOkay) {
      throw new UnauthorizedException('Invalid password provided');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    await this.db.staffActivityLog.create({
      data: {
        staffMemberId: user.id,
        activity: `Logged in successfully with ip address ${ipAddress}`,
      },
    });

    return {
      accessToken: await this.createToken(payload, 'staffMemberAccess'),
      refreshToken: await this.createToken(payload, 'staffMemberRefresh'),
      user: {
        ...user,
        passwordHash: undefined,
        isLocked: undefined,
      },
    };
  }

  async refresh(refreshToken: string, userType: 'staffMember' | 'customer') {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get(`jwt.${userType}RefreshTokenSecret`)!,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token provided');
    }

    const newAccessToken = await this.createToken(
      {
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      },
      `${userType}Access`,
    );

    let user: any;
    if (userType === 'customer') {
      user = await this.db.customer.findFirst({
        where: {
          id: payload.sub,
        },
      });
    } else {
      user = await this.db.staffMember.findFirst({
        where: {
          id: payload.sub,
        },
      });
    }

    if (!user) {
      throw new UnauthorizedException('User for refresh token not found');
    }

    return {
      accessToken: newAccessToken,
      user: {
        ...user,
        passwordHash: undefined,
      },
    };
  }

  async customerSendOTP(dto: CustomerSendOtpDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // await this.cacheManager.set(`customer-otp:${dto.phone}`, otp, 60 * 10);

    // TODO: Implement actual OTP sending logic here
  }

  async customerVerifyOTP(dto: CustomerVerifyOtpDto) {
    // const cachedOtp = await this.cacheManager.get<string>(
    //   `customer-otp:${dto.phone}`,
    // );
    // if (!cachedOtp || cachedOtp !== dto.otp) {
    //   throw new UnauthorizedException('Invalid OTP provided');
    // }
    // await this.cacheManager.del(`customer-otp:${dto.phone}`);
    // let user = await this.db.customer.findFirst({
    //   where: {
    //     phone: dto.phone,
    //   },
    // });
    // if (!user) {
    //   // If user does not exist, create a new one
    //   user = await this.db.customer.create({
    //     data: {
    //       phone: dto.phone,
    //       name: dto.name,
    //     },
    //   });
    // }
    // const payload = {
    //   sub: user.id,
    //   phone: user.phone,
    // };
    // return {
    //   accessToken: await this.createToken(payload, 'customerAccess'),
    //   refreshToken: await this.createToken(payload, 'customerRefresh'),
    //   user: user,
    // };
  }
}
