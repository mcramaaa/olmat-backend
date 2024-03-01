import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CashbackSettings } from 'src/entities/cashback-settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashbackSettingService {
  constructor(
    @InjectRepository(CashbackSettings)
    private cashbackSettingRepository: Repository<CashbackSettings>,
  ) {}

  async find(): Promise<CashbackSettings> {
    return await this.cashbackSettingRepository.findOne({ where: {} });
  }
}
