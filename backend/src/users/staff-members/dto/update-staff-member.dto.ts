import { StaffRole } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(StaffRole)
  role: StaffRole;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsOptional()
  password: string;
}
