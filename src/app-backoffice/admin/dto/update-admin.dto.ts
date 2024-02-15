import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsNotEmpty()
  curent_password: string;
}
