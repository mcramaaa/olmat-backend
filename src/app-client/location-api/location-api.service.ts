import { Injectable } from '@nestjs/common';
import { CityService } from 'src/app-backoffice/city/city.service';
import { DegreeService } from 'src/app-backoffice/degree/degree.service';
import { ProvinceService } from 'src/app-backoffice/province/province.service';
import { SchoolService } from 'src/app-backoffice/school/school.service';
import { SubdistrictService } from 'src/app-backoffice/subdistrict/subdistrict.service';
import { Cities } from 'src/entities/cities.entity';
import { Degree } from 'src/entities/degree.entity';
import { Provincies } from 'src/entities/provincies.entity';
import { Schools } from 'src/entities/schools.entity';
import { Subdistricts } from 'src/entities/subdistricts.entity';

@Injectable()
export class LocationApiService {
  constructor(
    private provinceService: ProvinceService,
    private cityService: CityService,
    private subdistrictService: SubdistrictService,
    private schoolService: SchoolService,
    private degreeService: DegreeService,
  ) {}
  async getProvincies(): Promise<Provincies[]> {
    return await this.provinceService.getProvincies();
  }

  async getCities(province_id: string): Promise<Cities[]> {
    return await this.cityService.getCitiesByProvince(province_id);
  }

  async getSubdistricts(city_id: string): Promise<Subdistricts[]> {
    return await this.subdistrictService.getSubdistrictsByCity(city_id);
  }

  async getSchools(subdistrict_id: number): Promise<Schools[]> {
    return await this.schoolService.getSchoolBySubdistrict(subdistrict_id);
  }

  async getDegree(): Promise<Degree[]> {
    return await this.degreeService.findAll();
  }
}
