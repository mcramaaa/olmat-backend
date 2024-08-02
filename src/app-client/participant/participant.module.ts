import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { SchoolModule } from '../school/school.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';
import { XenditModule } from 'src/vendor/xendit/xendit.module';
import { SettingModule } from 'src/core/setting/setting.module';
import { EventSettingModule } from 'src/core/event-setting/event-setting.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participants]),
    SchoolModule,
    PaymentModule,
    EventSettingModule,
    PaymentGatewayModule,
    XenditModule,
    SettingModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destinationPath =
            file.fieldname === 'imgs'
              ? './storage/imgs/'
              : './storage/attachments/';
          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          if (file.fieldname === 'imgs') {
            req['imgFileNames'] = req['imgFileNames'] || [];
            req['imgFileNames'].push(
              file.fieldname + '-' + uniqueSuffix + '.webp',
            );
            cb(null, file.fieldname + '-' + uniqueSuffix + '.webp');
          } else {
            req['attachmentFileNames'] = req['attachmentFileNames'] || [];
            req['attachmentFileNames'].push(
              file.fieldname + '-' + uniqueSuffix + '.webp',
            );
            cb(null, file.fieldname + '-' + uniqueSuffix + '.webp');
          }
        },
      }),
    }),
  ],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
