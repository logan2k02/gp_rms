import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { StaffMember, StaffRole } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StaffMembersService } from 'src/users/staff-members/staff-members.service';

@Injectable()
export class StaffMemberJwtStrategy extends PassportStrategy(
  Strategy,
  'staff-member-jwt',
) {
  constructor(
    config: ConfigService,
    private readonly usersService: StaffMembersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.staffMemberAccessTokenSecret')!,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any): Promise<StaffMember> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const allowedStaffRoles = (req as any).allowedStaffRoles as StaffRole[];

    if (allowedStaffRoles.length && !allowedStaffRoles.includes(user.role)) {
      throw new UnauthorizedException(`Access denied`);
    }

    return user;
  }
}
