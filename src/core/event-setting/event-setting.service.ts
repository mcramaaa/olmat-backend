import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSettings } from 'src/entities/event-settings.entity';
import { Repository } from 'typeorm';
import { CreateEventSettingDTO } from './dto/create-event-setting.dto';
import { IPaginationOptions } from 'src/shared/types/pagination-options';

@Injectable()
export class EventSettingService {
  constructor(
    @InjectRepository(EventSettings)
    private eventSettingRepo: Repository<EventSettings>,
  ) {}

  async find(): Promise<EventSettings> {
    return await this.eventSettingRepo.findOne({ where: {} });
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[EventSettings[], number]> {
    try {
      return await this.eventSettingRepo.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where: {},
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(payload: CreateEventSettingDTO): Promise<void> {
    const countSetting = await this.eventSettingRepo.count();
    if (!countSetting) {
      await this.eventSettingRepo.save(this.eventSettingRepo.create({}));
    } else {
      const eventSetting = await this.eventSettingRepo.findOne({ where: {} });
      Object.assign(eventSetting, {
        name: payload.name,
        tagline: payload.tagline,
        start: payload.start,
        end: payload.end,
        amount: payload.amount,
        free: payload.free,
      });
      await this.eventSettingRepo.save(eventSetting);
    }
  }

  // async update(payload: UpdateEventSettingDTO): Promise<void> {
  //   const eventSetting = await this.find();
  //   if (!eventSetting) throw new BadRequestException();
  //   Object.assign(eventSetting, {
  //     name: payload.name,
  //     tagline: payload.tagline,
  //     start: payload.start,
  //     end: payload.end,
  //     amount: payload.amount,
  //     free: payload.free,
  //   });
  // }
}
