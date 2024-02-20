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
  ): Promise<[Schools[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: { is_accept: true },
        relations: { city: { region: true } },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Schools>,
  ): Promise<NullableType<Schools>> {
    return await this.repository.findOne({ where: condition });
  }

  async schoolRequesList(
    paginationOptions: IPaginationOptions,
  ): Promise<[Schools[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: { is_accept: false },
        relations: { city: { region: true } },
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
}
