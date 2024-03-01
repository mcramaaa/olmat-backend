import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateParticipantDTO {
  @ApiProperty()
  @IsNotEmpty()
  participants: any[];

  @ApiProperty()
  @IsNotEmpty()
  school_id: number;

  @ApiProperty()
  @IsNotEmpty()
  payment_code: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @Type(() => Array<Buffer>)
  imgs?: Express.Multer.File[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @Type(() => Array<Buffer>)
  attachments?: Express.Multer.File[];
}
