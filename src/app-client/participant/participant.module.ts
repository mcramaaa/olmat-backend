import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { SchoolModule } from '../school/school.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CashbackSettingModule } from 'src/core/cashback-setting/cashback-setting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participants]),
    SchoolModule,
    CashbackSettingModule,
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
          if (file.mimetype.startsWith('image/')) {
            req['imgFileNames'] = req['imgFileNames'] || [];
            req['imgFileNames'].push(
              file.fieldname + '-' + uniqueSuffix + '.webp',
            );
            cb(null, file.fieldname + '-' + uniqueSuffix + '.webp');
          } else {
            const extension = extname(file.originalname).toLowerCase();
            req['attachmentFileNames'] = req['attachmentFileNames'] || [];
            req['attachmentFileNames'].push(
              file.fieldname + '-' + uniqueSuffix + extension,
            );
            cb(null, file.fieldname + '-' + uniqueSuffix + extension);
          }
        },
      }),
    }),
  ],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
