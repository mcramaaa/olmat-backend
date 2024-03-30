import { Module } from '@nestjs/common';
import { EventSettingController } from './event-setting.controller';
import { EventSettingService } from './event-setting.service';
import { EventSettings } from 'src/entities/event-settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventSettings])],
  controllers: [EventSettingController],
  providers: [EventSettingService],
  exports: [EventSettingService],
})
export class EventSettingModule {}
