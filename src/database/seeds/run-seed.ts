import { NestFactory } from '@nestjs/core';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';
import { RegionSeedService } from './region/region-seed.service';
import { ProvinceSeedService } from './province-seed/province-seed.service';
import { CitySeedService } from './city-seed/city-seed.service';
import { SubdistrictSeedService } from './subdistrict-seed/subdistrict-seed.service';
import { DegreeSeedService } from './degree-seed/degree-seed.service';
import { SchoolSeedService } from './school-seed/school-seed.service';
import { UserSeedService } from './user-seed/user-seed.service';
import { PaymentGatewaySeedService } from './payment-gateway-seed/payment-gateway-seed.service';
import { EventSettingSeedService } from './event-setting-seed/event-setting-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  await app.get(RegionSeedService).run();
  await app.get(ProvinceSeedService).run();
  await app.get(CitySeedService).run();
  await app.get(SubdistrictSeedService).run();
  await app.get(DegreeSeedService).run();
  await app.get(SchoolSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(PaymentGatewaySeedService).run();
  await app.get(EventSettingSeedService).run();

  await app.close();
};

void runSeed();
