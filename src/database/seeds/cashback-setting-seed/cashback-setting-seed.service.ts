import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CashbackSettings } from 'src/entities/cashback-settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashbackSettingSeedService {
  constructor(
    @InjectRepository(CashbackSettings)
    private repository: Repository<CashbackSettings>,
  ) {}
  async run() {
    const count = await this.repository.count();
    if (!count) {
      await this.repository.save(
        this.repository.create({
          amount: 10,
          free: 2,
        }),
      );
    }
  }
}
