import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { lowerCaseTransformer } from 'src/shared/transformers/lower-case.transformer';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['Users'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '08123456799' })
  @Validate(IsNotExist, ['Users'], {
    message: 'phoneAlreadyExists',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'secret' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'R4X68O5NMR' })
  @IsNotEmpty()
  referral: string;
}
