import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from 'src/shared/config/database.config';
import appConfig from 'src/shared/config/app.config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { BackofficeModules } from 'src/app-backoffice/module';
import authConfig from 'src/shared/config/auth.config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/guards/role.guard';
import cacheConfig from 'src/shared/config/cache.config';
import { RedisClientOptions } from 'redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserCLientModules } from 'src/app-client/module';
import { AuthModule } from 'src/auth/auth.module';
import { WebhookModule } from 'src/core/webhook/webhook.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { SettingModule } from 'src/core/setting/setting.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, cacheConfig],
      envFilePath: ['.env'],
    }),
    EventEmitterModule.forRoot({
      global: true,
      verboseMemoryLeak: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: () => ({
        isGlobal: true,
        store: require('cache-manager-redis-store'),
        host: process.env.CACHE_HOST,
        max: Number(process.env.CACHE_MAX),
        ttl: Number(process.env.CACHE_TTL),
        port: Number(process.env.CACHE_PORT),
        auth_pass: process.env.CACHE_PASS,
        db: Number(process.env.CACHE_DB),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'mail.olmat-uinsa.com',
        port: 465,
        // ignoreTLS: true,
        secure: true,
        auth: {
          user: 'olmatuinsa@olmat-uinsa.com',
          pass: '#OlmatUINSA20',
        },
      },
      // defaults: {
      //   from: '"No Reply" <no-reply@localhost>',
      // },
      // preview: true,
    }),

    AuthModule,
    WebhookModule,
    VendorModule,
    AppCacheModule,
    SettingModule,
    ...BackofficeModules,
    ...UserCLientModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
