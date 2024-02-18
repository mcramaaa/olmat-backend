import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/core/cache/cache.service';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { formatString } from 'src/shared/utils/string';
import authConfig from 'src/shared/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { Hotp, ValidTotpConfig, generateSecret } from 'time2fa';
import { CustomStatusException } from 'src/shared/exceptions/custom.exception';
import { DataSource } from 'typeorm';
import { UserService } from 'src/app-client/user/user.service';
import { Users } from 'src/entities/users.entity';
import { NullableType } from 'src/shared/types/nullable.type';
import { AuthRegisterLoginDto } from '../dto/auth-register-login.dto';
import { generateHash } from 'src/shared/utils/random-string';

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    private usersService: UserService,
    private cacheService: CacheService,
    private datasource: DataSource,
  ) {}

  OTPConfig: ValidTotpConfig = {
    algo: 'sha1',
    digits: 6,
    period: this.config.otpExpires ?? 120,
    secretSize: 10,
  };

  private getOTPCacheKey(hash: string): string {
    return formatString(CACHE_KEY_AUTH.OTP, hash);
  }

  async register(dto: AuthRegisterLoginDto): Promise<string> {
    const userExistNew = await this.usersService.findOne({ phone: dto.phone });
    if (userExistNew) {
      throw new CustomStatusException(`User already exist`, 409);
    }

    const secret = generateSecret();
    const userHash = generateHash();
    const otpCounter = 1;
    const userOtpSecret = secret;

    const passcode = Hotp.generatePasscode(
      {
        counter: otpCounter,
        secret,
      },
      this.OTPConfig,
    );

    console.log('userHash', userHash);
    console.log('passcode', passcode);
    console.log('userotpsecret', userOtpSecret);

    await this.cacheService.set(
      this.getOTPCacheKey(userHash) + '-' + userOtpSecret,
      1,
      this.config.otpExpires,
    );

    //Send email otp

    return userHash;
  }

  async me(user: Users): Promise<NullableType<Users>> {
    return this.usersService.findOne({
      id: user.id,
    });
  }

  async logout(token: string): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, token));
  }
}
