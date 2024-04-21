import { Module } from '@nestjs/common';
import { SubdistrictSeedService } from './subdistrict-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdistricts } from 'src/entities/subdistricts.entity';

@Module({
  imports: [],
  providers: [SubdistrictSeedService],
})
export class SubdistrictSeedModule {}
