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
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, cacheConfig],
      envFilePath: ['.env'],
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
