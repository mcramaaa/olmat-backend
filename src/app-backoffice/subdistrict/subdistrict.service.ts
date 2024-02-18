import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistricts } from 'src/entities/subdistricts.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class SubdistrictService {
  constructor(
    @InjectRepository(Subdistricts)
    private repository: Repository<Subdistricts>,
  ) {}

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
