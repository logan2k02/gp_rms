import { IsNotEmpty, IsString } from 'class-validator';

export class StaffLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
