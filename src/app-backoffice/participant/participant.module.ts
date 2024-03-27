import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { ParticipantController } from './participant.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participants]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destinationPath =
            file.fieldname === 'img'
              ? './storage/imgs/'
              : './storage/attachments/';
          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          if (file.fieldname === 'img') {
            req['imgFileName'] = file.fieldname + '-' + uniqueSuffix + '.webp';
            cb(null, file.fieldname + '-' + uniqueSuffix + '.webp');
          } else {
            req['attachmentFileName'] =
              file.fieldname + '-' + uniqueSuffix + '.webp';
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
