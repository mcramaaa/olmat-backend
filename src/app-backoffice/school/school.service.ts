import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(Schools) private repository: Repository<Schools>,
  ) {}

  async getSchoolBySubdistrict(subdistrict_id: number): Promise<Schools[]> {
    return await this.repository.find({
      where: { subdistrict: { id: subdistrict_id } },
    });
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Schools[], number]> {
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
