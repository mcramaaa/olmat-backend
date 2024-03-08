import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { TFilterUser } from 'src/shared/types/user.type';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TFilterUser,
  ): Promise<[Users[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: {
          name: filter.name ? Like(`%${filter.name}%`) : undefined,
          email: filter.email ? Like(`%${filter.email}%`) : undefined,
          phone: filter.phone ? Like(`%${filter.phone}%`) : undefined,
          school: filter.school_id ? { id: +filter.school_id } : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Users>,
  ): Promise<NullableType<Users>> {
    return await this.repository.findOne({ where: condition });
  }
}
