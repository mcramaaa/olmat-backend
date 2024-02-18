import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/app-client/user/user.module';
import { JWTUserStrategy } from '../strategies/jwt-user.strategy';
import { AnonymousStrategy } from '../strategies/anonymous.strategy';
import { SchoolModule } from 'src/app-client/school/school.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SchoolModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.sessionExpires'),
        },
      }),
    }),
  ],
  controllers: [AuthUserController],
  providers: [
    IsExist,
    IsNotExist,
    AuthUserService,
    JWTUserStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthUserService],
})
export class AuthUserModule {}
