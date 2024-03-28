import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({ example: 'Jhone', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'jhon@admin.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  role_id?: number;
}
