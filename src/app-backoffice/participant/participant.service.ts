import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participants)
    private repository: Repository<Participants>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Participants[], number]> {
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
