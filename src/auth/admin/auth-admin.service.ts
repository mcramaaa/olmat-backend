import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { ConfigType } from '@nestjs/config';
import { compare } from 'bcrypt';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { AdminService } from 'src/app-backoffice/admin/admin.service';
import { NullableType } from 'src/shared/types/nullable.type';
import { Admins } from 'src/entities/admins.entity';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import authConfig from 'src/shared/config/auth.config';
import { formatString } from 'src/shared/utils/string';
import { LoginResponseType } from 'src/shared/types/auth/login-response.type';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { CacheService } from 'src/core/cache/cache.service';

@Injectable()
export class AuthAdminService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    private adminService: AdminService,
    private cacheService: CacheService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType<Admins>> {
    const user = await this.adminService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new ErrorException(
        {
          email: 'notFound',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new ErrorException(
        {
          password: 'incorrectPassword',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      access: 'admin',
      role: {
        name: user.role.name,
        permission: user.role.permissions,
      },
    });

    await this.cacheService.set(
      formatString(CACHE_KEY_AUTH.SESSION, user.id),
      true,
      parseTimeToSeconds(this.config.sessionExpires ?? '1h'),
    );

    return { token, user };
  }

  async me(id: number): Promise<NullableType<Admins>> {
    return this.adminService.findOne({
      id,
    });
  }

  async logout(token: number): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, token));
  }
}
