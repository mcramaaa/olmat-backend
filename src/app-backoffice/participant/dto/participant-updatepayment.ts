import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class participantsUpdateByPaymentDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'active' })
  status?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  payment_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  school_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  user_id?: number;
}
