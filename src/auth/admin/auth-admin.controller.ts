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
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';
import { NullableType } from 'src/shared/types/nullable.type';
import { Admins } from 'src/entities/admins.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SessionAdmin } from 'src/shared/decorators/admin.decorator';

@ApiTags('Auth Admin')
@Controller({
  path: '/auth/admin',
  version: '1',
})
export class AuthAdminController {
  constructor(private readonly service: AuthAdminService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<OkResponse<Readonly<{ token: string; user: Admins }>>> {
    return okTransform(await this.service.validateLogin(loginDto));
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async admin(
    @SessionAdmin() user: Admins,
  ): Promise<OkResponse<NullableType<Admins>>> {
    return okTransform(await this.service.me(user.id));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionAdmin() user: Admins): Promise<OkResponse<void>> {
    return okTransform(await this.service.logout(user.id));
  }
}
