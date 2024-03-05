import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Payments } from 'src/entities/payments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payments) private paymentRepository: Repository<Payments>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    user: Users,
  ): Promise<[Payments[], number]> {
    try {
      return await this.paymentRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: { user: { id: user.id } },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Payments>,
  ): Promise<NullableType<Payments>> {
    return await this.paymentRepository.findOne({ where: condition });
  }
}
