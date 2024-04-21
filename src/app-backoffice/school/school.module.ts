import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { SchoolController } from './school.controller';
import { ProvinceModule } from '../province/province.module';
import { CityModule } from '../city/city.module';
import { SubdistrictModule } from '../subdistrict/subdistrict.module';
import { DegreeModule } from '../degree/degree.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schools]),
    ProvinceModule,
    CityModule,
    SubdistrictModule,
    DegreeModule,
  ],
  providers: [SchoolService],
  controllers: [SchoolController],
  exports: [SchoolService],
})
export class SchoolModule {}
