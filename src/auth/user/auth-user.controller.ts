import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { AuthRegisterLoginDto } from '../dto/auth-register-login.dto';
import { NullableType } from 'src/shared/types/nullable.type';
import { Users } from 'src/entities/users.entity';
import { OtpDto } from '../dto/otp.dto';
import { HashDTO } from '../dto/hash.dto';
import { AuthUserLoginDto } from '../dto/auth-user-login.dto';
import { UpdateUserAuthDTO } from './dto/update-user-auth.dto';
import { AuthForgotPasswordDto } from '../dto/auth-forgot-password.dto';

@ApiTags('Auth User')
@Controller({
  path: '/auth/user',
  version: '1',
})
export class AuthUserController {
  constructor(private readonly service: AuthUserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<OkResponse<string>> {
    return okTransform(
      await this.service.register(createUserDto),
      'We have already send OTP for activation',
      HttpStatus.CREATED,
    );
  }

  @Post('/resend/otp')
  @HttpCode(HttpStatus.OK)
  async confirmResendOTP(
    @Body() payload: HashDTO,
  ): Promise<OkResponse<string>> {
    return okTransform(
      await this.service.resendOTP(payload.hash),
      'We have already send OTP for activation',
      HttpStatus.CREATED,
    );
  }

  @Post('/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Body() payload: OtpDto,
  ): Promise<OkResponse<{ token: string }>> {
    return okTransform(
      await this.service.confirmation(payload.hash, payload.otp),
    );
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  async me(
    @SessionUser() user: Users,
  ): Promise<OkResponse<NullableType<Users>>> {
    return okTransform(await this.service.me(user));
  }

  @Post('/forgot/password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<OkResponse<string>> {
    return okTransform(
      await this.service.forgotPassword(forgotPasswordDto.email),
      'We have already send email',
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body() loginDto: AuthUserLoginDto,
  ): Promise<OkResponse<Readonly<{ token: string; user: Users }>>> {
    return okTransform(await this.service.validateLogin(loginDto));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: Users): Promise<OkResponse<void>> {
    return okTransform(await this.service.logout(user.id));
  }

  @ApiBearerAuth()
  @Patch('/update-me')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @SessionUser() user: Users,
    @Body() userDto: UpdateUserAuthDTO,
  ): Promise<OkResponse<{ name: string; phone: string; email: string }>> {
    return okTransform(await this.service.update(user, userDto));
  }
}
