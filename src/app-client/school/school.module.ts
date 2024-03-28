import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { SchoolController } from './school.controller';
import { SubdistrictModule } from 'src/app-backoffice/subdistrict/subdistrict.module';
import { ProvinceModule } from 'src/app-backoffice/province/province.module';
import { CityModule } from 'src/app-backoffice/city/city.module';
import { DegreeModule } from 'src/app-backoffice/degree/degree.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schools]),
    SchoolModule,
    ProvinceModule,
    CityModule,
    SubdistrictModule,
    DegreeModule,
  ],
  providers: [SchoolService],
  exports: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
