import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SaveSettingDto {
  @ApiProperty({ example: 'setting' })
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Hello' })
  @IsNotEmpty()
  value: string;
}
