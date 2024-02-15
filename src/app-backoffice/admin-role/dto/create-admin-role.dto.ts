import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PERMISSIONS } from 'src/shared/enums/permissions.enum';

export class CreateAdminRoleDto {
  @ApiProperty({ example: 'Super Admin' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: Object.values(PERMISSIONS),
  })
  @IsNotEmpty()
  permissions: PERMISSIONS[];
}
