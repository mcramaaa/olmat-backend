import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/shared/config/app.config';
import databaseConfig from 'src/shared/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';

import { AdminSeedModule } from './admin/admin-seed.module';
import { RegionSeedModule } from './region/region-seed.module';
import { ProvinceSeedModule } from './province-seed/province-seed.module';
import { CitySeedModule } from './city-seed/city-seed.module';
import { SubdistrictSeedModule } from './subdistrict-seed/subdistrict-seed.module';
import { DegreeSeedModule } from './degree-seed/degree-seed.module';
import { SchoolSeedModule } from './school-seed/school-seed.module';
import { UserSeedModule } from './user-seed/user-seed.module';
import { PaymentGatewaySeedModule } from './payment-gateway-seed/payment-gateway-seed.module';
import { EventSettingSeedModule } from './event-setting-seed/event-setting-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AdminSeedModule,
    RegionSeedModule,
    ProvinceSeedModule,
    CitySeedModule,
    SubdistrictSeedModule,
    DegreeSeedModule,
    SchoolSeedModule,
    UserSeedModule,
    PaymentGatewaySeedModule,
    EventSettingSeedModule,
  ],
})
export class SeedModule {}
