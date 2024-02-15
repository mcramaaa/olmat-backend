import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthForgotPasswordDto {
  @ApiProperty({ example: '08111111' })
  @IsNotEmpty()
  phone: string;
}
