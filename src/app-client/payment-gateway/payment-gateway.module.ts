import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentGateways])],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
