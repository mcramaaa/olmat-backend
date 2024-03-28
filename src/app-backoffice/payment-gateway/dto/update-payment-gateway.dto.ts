import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentGroup, PaymentProvider } from 'src/shared/enums/payment.enum';

export class UpdatePaymentGatewayDto {
  @ApiProperty({ example: 'OVO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  @Type(() => Buffer)
  img?: Express.Multer.File;

  @ApiProperty({ example: PaymentProvider.XENDIT })
  @IsNotEmpty()
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiProperty({ example: PaymentGroup.E_WALLET })
  @IsNotEmpty()
  @IsEnum(PaymentGroup)
  group: PaymentGroup;

  @ApiProperty({ example: 'ID_OVO' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 4500 })
  @IsNotEmpty()
  fee_flat: number;

  @ApiProperty({ example: 0.7 })
  @IsNotEmpty()
  fee_percentage: number;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  min_amount: number;

  @ApiProperty({ example: 100000 })
  @IsNotEmpty()
  max_amount: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  @Type(() => Boolean)
  is_active: boolean;
}
