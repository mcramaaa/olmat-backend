import { Module } from '@nestjs/common';
import { PaymentGatewaySeedService } from './payment-gateway-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentGateways])],
  providers: [PaymentGatewaySeedService],
})
export class PaymentGatewaySeedModule {}
