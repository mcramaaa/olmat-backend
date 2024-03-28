import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincies } from 'src/entities/provincies.entity';
import { ProvinceController } from './province.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Provincies])],
  providers: [ProvinceService],
  controllers: [ProvinceController],
  exports: [ProvinceService],
})
export class ProvinceModule {}
