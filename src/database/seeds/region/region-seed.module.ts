import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from 'src/entities/regions.entity';
import { RegionSeedService } from './region-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regions])],
  providers: [RegionSeedService],
})
export class RegionSeedModule {}
