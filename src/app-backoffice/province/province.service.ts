import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincies } from 'src/entities/provincies.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Provincies) private repository: Repository<Provincies>,
  ) {}

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
