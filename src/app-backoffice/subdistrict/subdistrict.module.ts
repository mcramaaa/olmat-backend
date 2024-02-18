import { Module } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdistricts } from 'src/entities/subdistricts.entity';
import { SubdistrictController } from './subdistrict.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subdistricts])],
  providers: [SubdistrictService],
  controllers: [SubdistrictController],
})
export class SubdistrictModule {}
