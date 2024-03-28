import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PaymentGatewayController } from './payment-gateway.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentGateways]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destinationPath = './storage/payment-logo/';
          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          (req['logoFileNames'] =
            file.fieldname + '-' + uniqueSuffix + '.webp'),
            cb(null, file.fieldname + '-' + uniqueSuffix + '.webp');
        },
      }),
    }),
  ],
  providers: [PaymentGatewayService],
  controllers: [PaymentGatewayController],
})
export class PaymentGatewayModule {}
