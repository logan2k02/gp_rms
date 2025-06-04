import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Customer } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomersService } from 'src/users/customers/customers.service';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  'customer-jwt',
) {
  constructor(
    config: ConfigService,
    private readonly usersService: CustomersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.customerAccessTokenSecret')!,
    });
  }

  async validate(payload: any): Promise<Customer> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    return user;
  }
}
