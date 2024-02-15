import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OtpDto {
  @ApiProperty()
  @IsNotEmpty()
  hash: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}
