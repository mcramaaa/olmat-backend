import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { AdminModule } from 'src/app-backoffice/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JWTAdminStrategy } from '../strategies/jwt-admin.strategy';
import { AppCacheModule } from 'src/core/cache/cache.module';

@Module({
  imports: [
    AppCacheModule,
    AdminModule,
    PassportModule,
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
  controllers: [AuthAdminController],
  providers: [IsExist, IsNotExist, AuthAdminService, JWTAdminStrategy],
  exports: [AuthAdminService],
})
export class AuthAdminModule {}
