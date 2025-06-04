import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerVerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
