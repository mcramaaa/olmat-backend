import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PaymentModule } from '../payment/payment.module';
import { EventSettingModule } from '../event-setting/event-setting.module';

@Module({
  imports: [PaymentModule, EventSettingModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
