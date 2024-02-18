import { NestFactory } from '@nestjs/core';
import { AdminSeedService } from './admin/admin-seed.service';
import { SeedModule } from './seed.module';
import { RegionSeedService } from './region/region-seed.service';
import { ProvinceSeedService } from './province-seed/province-seed.service';
import { CitySeedService } from './city-seed/city-seed.service';
import { SubdistrictSeedService } from './subdistrict-seed/subdistrict-seed.service';
import { DegreeSeedService } from './degree-seed/degree-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  await app.get(RegionSeedService).run();
  await app.get(ProvinceSeedService).run();
  await app.get(CitySeedService).run();
  await app.get(SubdistrictSeedService).run();
  await app.get(DegreeSeedService).run();

  await app.close();
};

void runSeed();
