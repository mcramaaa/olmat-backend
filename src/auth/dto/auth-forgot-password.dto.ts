import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthForgotPasswordDto {
  @ApiProperty({ example: 'tegaracs.ti@gmail.com' })
  @IsNotEmpty()
  email: string;
}
