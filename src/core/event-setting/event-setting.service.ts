import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSettings } from 'src/entities/event-settings.entity';
import { Repository } from 'typeorm';
import { CreateEventSettingDTO } from './dto/create-event-setting.dto';

@Injectable()
export class EventSettingService {
  constructor(
    @InjectRepository(EventSettings)
    private eventSettingRepo: Repository<EventSettings>,
  ) {}

  async find(): Promise<EventSettings> {
    return await this.eventSettingRepo.findOne({ where: {} });
  }

  async create(payload: CreateEventSettingDTO): Promise<void> {
    const countSetting = await this.eventSettingRepo.count();
    if (!countSetting) {
      await this.eventSettingRepo.save(this.eventSettingRepo.create({}));
    } else {
      const eventSetting = await this.eventSettingRepo.findOne({ where: {} });
      Object.assign(eventSetting, {
        start: payload.start,
        end: payload.end,
        amount: payload.amount,
        free: payload.free,
      });
      await this.eventSettingRepo.save(eventSetting);
    }
  }
}
