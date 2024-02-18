import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  SerializeOptions,
  Body,
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

@ApiTags('Auth User')
@Controller({
  path: '/auth/user',
  version: '1',
})
export class AuthUserController {
  constructor(private readonly service: AuthUserService) {}

  @SerializeOptions({
    groups: ['me'],
  })
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
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('/me')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  async me(
    @SessionUser() user: Users,
  ): Promise<OkResponse<NullableType<Users>>> {
    return okTransform(await this.service.me(user));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: Users): Promise<OkResponse<void>> {
    return okTransform(await this.service.logout(user.id));
  }
}
