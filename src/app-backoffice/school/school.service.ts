import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { TFilterSchool } from 'src/shared/types/school.type';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(Schools) private repository: Repository<Schools>,
  ) {}

  async getSchoolBySubdistrict(subdistrict_id: number): Promise<Schools[]> {
    return await this.repository.find({
      where: { subdistrict: { id: subdistrict_id }, is_accept: true },
    });
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TFilterSchool,
  ): Promise<[Schools[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: {
          is_accept: true,
          city: filter.city_id
            ? { id: filter.city_id }
            : filter.region_id
            ? { region: { id: filter.region_id } }
            : undefined,
          subdistrict: filter.subdistric_id
            ? { id: +filter.subdistric_id }
            : undefined,
          degree: filter.degree_id ? { id: filter.degree_id } : undefined,
        },
        relations: {
          city: { region: true },
          province: true,
          subdistrict: true,
          degree: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Schools>,
  ): Promise<NullableType<Schools>> {
    return await this.repository.findOne({
      where: condition,
      relations: { degree: true },
    });
  }

  async schoolRequesList(
    paginationOptions: IPaginationOptions,
    filter: TFilterSchool,
  ): Promise<[Schools[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: {
          is_accept: false,
          city: filter.city_id
            ? { id: filter.city_id }
            : filter.region_id
            ? { region: { id: filter.region_id } }
            : undefined,
          subdistrict: filter.subdistric_id
            ? { id: +filter.subdistric_id }
            : undefined,
          degree: filter.degree_id ? { id: filter.degree_id } : undefined,
        },
        relations: { city: { region: true }, degree: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async acceptSchool(school_id: number) {
    const school = await this.findOne({ id: school_id });
    if (!school) throw new BadRequestException();
    try {
      school.is_accept = true;
      school.save();
    } catch (error) {
      throw new InternalServerErrorException(0);
    }
  }

  async deleteSchool(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
