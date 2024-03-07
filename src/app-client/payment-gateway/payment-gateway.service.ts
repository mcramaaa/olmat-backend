import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateways)
    private paymentGatewayRepository: Repository<PaymentGateways>,
  ) {}

  async findOne(
    condition: EntityCondition<PaymentGateways>,
  ): Promise<NullableType<PaymentGateways>> {
    return await this.paymentGatewayRepository.findOne({ where: condition });
  }

  getFee(amount: number, payment: PaymentGateways): Promise<number> {
    return Promise.resolve(
      payment.fee_flat + (payment.fee_percentage * amount) / 100,
    );
  }
}
