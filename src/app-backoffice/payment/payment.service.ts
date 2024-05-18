import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from 'src/entities/payments.entity';
import { PaymentStatus } from 'src/shared/enums/payment.enum';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payments)
    private paymentRepopsitory: Repository<Payments>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: {
      username?: string;
      status?: PaymentStatus;
      invoice?: string;
    },
  ): Promise<[Payments[], number]> {
    try {
      return await this.paymentRepopsitory.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: {
          user: { name: filter.username },
          status: filter.status,
          invoice: filter.invoice,
        },
        relations: { user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Payments>,
  ): Promise<NullableType<Payments>> {
    return await this.paymentRepopsitory.findOne({
      where: condition,
      relations: { participants: true, user: true },
    });
  }
}
