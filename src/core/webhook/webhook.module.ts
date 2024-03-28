import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XenditWebhookStrategy } from 'src/shared/guards/xendit-webhook.guard';
import { Payments } from 'src/entities/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  controllers: [WebhookController],
  providers: [WebhookService, XenditWebhookStrategy],
})
export class WebhookModule {}
