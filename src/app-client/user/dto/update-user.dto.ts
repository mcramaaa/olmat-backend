import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Bejo' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'ggwp@gmail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '081685465498' })
  @IsOptional()
  phone: string;

  @ApiProperty({ example: 'newPassword' })
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'newPassword' })
  @IsOptional()
  currentPassword: string;
}
