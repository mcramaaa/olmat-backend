import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { Repository } from 'typeorm';
import { CreateSchoolDTO } from './dto/create-school.dto';
import { SubdistrictService } from 'src/app-backoffice/subdistrict/subdistrict.service';
import { ProvinceService } from 'src/app-backoffice/province/province.service';
import { CityService } from 'src/app-backoffice/city/city.service';
import { DegreeService } from 'src/app-backoffice/degree/degree.service';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(Schools) private repository: Repository<Schools>,
    private subdistrictService: SubdistrictService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private degreeService: DegreeService,
  ) {}

  async findOne(
    condition: EntityCondition<Schools>,
  ): Promise<NullableType<Schools>> {
    return await this.repository.findOne({
      where: condition,
      relations: { city: { region: true }, degree: true },
    });
  }

  async craete(payload: CreateSchoolDTO): Promise<Schools> {
    const province = await this.provinceService.findOne({
      id: payload.province_id,
    });
    if (!province) throw new BadRequestException();

    const city = await this.cityService.findOne({
      id: payload.city_id,
    });
    if (!city) throw new BadRequestException();

    const subdistrict = await this.subdistrictService.findOne({
      id: payload.subdistrict_id,
    });
    if (!subdistrict) throw new BadRequestException();

    const degree = await this.degreeService.findOne({ id: payload.degree_id });
    if (!degree) throw new BadRequestException();

    return await this.repository.save(
      this.repository.create({
        ...payload,
        degree,
        is_accept: false,
        province,
        city,
        subdistrict,
      }),
    );
  }
}
