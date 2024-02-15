import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthUserLoginDto {
  @ApiProperty({ example: '081233838383' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  password: string;
}
