import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSettings } from 'src/entities/event-settings.entity';
import { EventSettingSeedService } from './event-setting-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventSettings])],
  providers: [EventSettingSeedService],
})
export class EventSettingSeedModule {}
