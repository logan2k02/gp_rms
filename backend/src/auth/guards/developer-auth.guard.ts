import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeveloperAuthGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const password = request.query.password;
    if (!password) {
      throw new UnauthorizedException('Password is required');
    }

    const allowedPassword = this.config.get<string>(`settings.superPassword`);

    if (allowedPassword === password) {
      return true;
    }

    throw new UnauthorizedException('Access denied');
  }
}
