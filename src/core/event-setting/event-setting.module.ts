import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSettings } from 'src/entities/event-settings.entity';
import { EventSettingService } from './event-setting.service';
import { EventSettingController } from './event-setting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventSettings])],
  providers: [EventSettingService],
  exports: [EventSettingService],
  controllers: [EventSettingController],
})
export class EventSettingModule {}
