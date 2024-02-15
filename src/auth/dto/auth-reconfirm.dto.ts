import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthReconfirmDto {
  @ApiProperty({ example: '08111111' })
  @IsNotEmpty()
  phone: string;
}
