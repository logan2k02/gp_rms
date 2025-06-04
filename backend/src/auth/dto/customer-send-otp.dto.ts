import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerSendOtpDto {
  @IsString()
  @IsNotEmpty()
  phone: string;
}
