import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistricts } from 'src/entities/subdistricts.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class SubdistrictService {
  constructor(
    @InjectRepository(Subdistricts)
    private repository: Repository<Subdistricts>,
  ) {}

  async findOne(
    condition: EntityCondition<Subdistricts>,
  ): Promise<NullableType<Subdistricts>> {
    return await this.repository.findOne({ where: condition });
  }

  async getSubdistrictsByCity(city_id: string): Promise<Subdistricts[]> {
    return await this.repository.find({
      where: { city: { id: city_id } },
    });
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Subdistricts[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
