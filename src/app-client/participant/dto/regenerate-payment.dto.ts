import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegeneratePaymentDTO {
  @ApiProperty()
  @IsNotEmpty()
  oldPaymentId: number;

  @ApiProperty()
  @IsNotEmpty()
  paymentCode: string;
}
