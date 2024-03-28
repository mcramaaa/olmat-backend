import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentGatewaySeedService {
  constructor(
    @InjectRepository(PaymentGateways)
    private readonly paymentGatewayRepository: Repository<PaymentGateways>,
  ) {}

  async run() {
    const count = await this.paymentGatewayRepository.count();
    if (!count) {
      await this.paymentGatewayRepository.save(
        this.paymentGatewayRepository.create({
          name: 'QRIS',
          provider: 'xendit',
          group: 'qris',
          logo: 'logo.img',
          code: 'QRIS',
          fee_flat: 4500,
          fee_percentage: 0,
          max_amount: 100000000,
          min_amount: 10000,
          is_active: true,
        }),
      );
    }
  }
}
