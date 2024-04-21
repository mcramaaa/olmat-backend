import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

export class CreateSchoolDTO {
  @ApiProperty({ example: '35' })
  @IsNotEmpty()
  province_id: string;

  @ApiProperty({ example: '3525' })
  @IsNotEmpty()
  city_id: string;

  @ApiProperty({ example: '3783' })
  @IsNotEmpty()
  subdistrict_id: string;

  @ApiProperty({
    example: 'JL. SAMPORA SEKEAWI, SUKAMENAK, KEC. MARGAHAYU, KAB.BANDUNG',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '001' })
  @IsNotEmpty()
  degree_id: string;

  @ApiProperty({ example: 'MTSN 2BANDUNG BARAT' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ggwp@gmail.com' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Schools'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty({ example: '0816827' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Schools'], {
    message: 'phoneAlreadyExists',
  })
  phone: string;
}
