import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jhon@admin.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ggwp' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  role_id: number;
}
