import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminRoleDto } from './create-admin-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PERMISSIONS } from 'src/shared/enums/permissions.enum';

export class UpdateAdminRoleDto extends PartialType(CreateAdminRoleDto) {
  @ApiProperty({ example: 'Admin Update' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: Object.values(PERMISSIONS),
  })
  @IsNotEmpty()
  permissions: PERMISSIONS[];
}
