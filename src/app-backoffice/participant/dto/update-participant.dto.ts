import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateParticipantDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  birth: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @Type(() => Buffer)
  img: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @Type(() => Buffer)
  attachment: Express.Multer.File;
}
