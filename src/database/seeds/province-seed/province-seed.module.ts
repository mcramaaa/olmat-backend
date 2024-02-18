import { Module } from '@nestjs/common';
import { ProvinceSeedService } from './province-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincies } from 'src/entities/provincies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincies])],
  providers: [ProvinceSeedService],
})
export class ProvinceSeedModule {}
