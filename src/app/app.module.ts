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
import { CacheConfig } from 'src/shared/types/config.type';
import { AuthModule } from 'src/auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, cacheConfig],
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async (configService: ConfigService<CacheConfig>) => ({
        store: redisStore as any,
        host: configService.get('host'),
        max: configService.get('max'),
        ttl: configService.get('ttl'),
        port: configService.get('port'),
        auth_pass: configService.get('auth_pass'),
        db: configService.get('db'),
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
    AuthModule,
    ...BackofficeModules,
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
