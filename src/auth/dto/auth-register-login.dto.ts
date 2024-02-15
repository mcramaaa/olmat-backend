import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthRegisterLoginDto {
  // @ApiProperty({ example: 'test@example.com' })
  // @Transform(lowerCaseTransformer)
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  // @IsEmail()
  // email: string;

  @ApiProperty({ example: '08123456799' })
  // @Validate(IsNotExist, ['User'], {
  //   message: 'phoneAlreadyExists',
  // })
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
