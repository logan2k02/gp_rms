import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import settingsConfig from './config/settings.config';
import { DatabaseModule } from './database/database.module';
import { CustomersModule } from './users/customers/customers.module';
import { StaffMembersModule } from './users/staff-members/staff-members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [settingsConfig, jwtConfig],
    }),
    CacheModule.register(),
    DatabaseModule,
    AuthModule,
    StaffMembersModule,
    CustomersModule,
  ],
})
export class AppModule {}
