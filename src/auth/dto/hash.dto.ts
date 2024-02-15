import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class HashDTO {
  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
