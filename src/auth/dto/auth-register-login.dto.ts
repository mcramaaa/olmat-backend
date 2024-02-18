import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { lowerCaseTransformer } from 'src/shared/transformers/lower-case.transformer';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'tegaracs.ti@gmail.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['Users'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '081645654' })
  @Validate(IsNotExist, ['Users'], {
    message: 'phoneAlreadyExists',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'ggwp1234' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  school_id: number;
}
