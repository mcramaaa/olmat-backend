import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSettings } from 'src/entities/event-settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventSettingSeedService {
  constructor(
    @InjectRepository(EventSettings)
    private repository: Repository<EventSettings>,
  ) {}
  async run() {
    const count = await this.repository.count();
    if (!count) {
      const start = new Date();
      start.setDate(start.getDate() - 7);

      const end = new Date();
      end.setMonth(end.getMonth() + 2);
      await this.repository.save(
        this.repository.create({
          name: 'eventName',
          shortname: 'shortEventName',
          tagline: 'eventTagline',
          copyright: 'Copyright Olimpiade',
          amount: 10,
          free: 2,
          start,
          end,
        }),
      );
    }
  }
}
