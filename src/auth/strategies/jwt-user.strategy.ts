import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { formatString } from 'src/shared/utils/string';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadType } from 'src/shared/types/auth/jwt-payload.type';
import authConfig from 'src/shared/config/auth.config';
import { OrNeverType } from 'src/shared/types/or-never.type';
import { CacheService } from 'src/core/cache/cache.service';

@Injectable()
export class JWTUserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private cacheService: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    });
  }

  public async validate(
    payload: JwtPayloadType,
  ): Promise<OrNeverType<JwtPayloadType>> {
    if (!payload.id || payload.access !== 'user') {
      throw new UnauthorizedException();
    }

    const isSessionExist = await this.cacheService.get(
      formatString(CACHE_KEY_AUTH.SESSION, payload.id),
    );
    if (!isSessionExist) {
      throw new UnauthorizedException('Session is invalid, please relogin');
    }

    return payload;
  }
}
