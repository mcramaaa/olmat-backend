import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincies } from 'src/entities/provincies.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Provincies) private repository: Repository<Provincies>,
  ) {}

  async findOne(
    condition: EntityCondition<Provincies>,
  ): Promise<NullableType<Provincies>> {
    return await this.repository.findOne({ where: condition });
  }

  async getProvincies(): Promise<Provincies[]> {
    return await this.repository.find();
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Provincies[], number]> {
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
