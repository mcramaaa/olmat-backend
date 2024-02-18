import { Module } from '@nestjs/common';
import { LocationApiController } from './location-api.controller';
import { LocationApiService } from './location-api.service';
import { ProvinceModule } from 'src/app-backoffice/province/province.module';
import { CityModule } from 'src/app-backoffice/city/city.module';
import { SubdistrictModule } from 'src/app-backoffice/subdistrict/subdistrict.module';
import { SchoolModule } from 'src/app-backoffice/school/school.module';

@Module({
  imports: [ProvinceModule, CityModule, SubdistrictModule, SchoolModule],
  providers: [LocationApiService],
  controllers: [LocationApiController],
})
export class LocationApiModule {}
