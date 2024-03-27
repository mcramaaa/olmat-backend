import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  createOneMonthLeter,
  createOneWeekAgo,
} from 'src/shared/utils/date-dto.helper';

export class CreateEventSettingDTO {
  @ApiProperty({ example: createOneWeekAgo() })
  @IsNotEmpty()
  start: string;

  @ApiProperty({ example: createOneMonthLeter() })
  @IsNotEmpty()
  end: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  free: number;
}
