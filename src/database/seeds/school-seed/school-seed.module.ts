import { Module } from '@nestjs/common';
import { SchoolSeedService } from './school-seed.service';

@Module({
  providers: [SchoolSeedService],
})
export class SchoolSeedModule {}
