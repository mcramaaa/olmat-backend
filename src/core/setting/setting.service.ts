import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { CacheService } from '../cache/cache.service';
import { SaveSettingDto } from './dto/save-setting.dto';
import { Setting } from 'src/entities/setting.entity';

@Injectable()
export class SettingService {
  private logger = new Logger(SettingService.name);

  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private cacheService: CacheService,
  ) {}

  findOne(fields: EntityCondition<Setting>): Promise<NullableType<Setting>> {
    return this.settingRepository.findOne({
      where: fields,
    });
  }

  async findByKey<T>(key: string): Promise<T> {
    let data = await this.cacheService.get<T>(key);
    if (!data) {
      data = await this.settingRepository
        .findOneOrFail({
          where: {
            key,
          },
        })
        .then((setting) => setting.value as T)
        .catch((error) => {
          this.logger.error(error);
          return undefined;
        });
      if (data) {
        await this.cacheService.set(key, data, 0);
      }
    }
    try {
      return JSON.parse(data as string) as T;
    } catch (error) {
      this.logger.error('Invalid data parse, maybe data blank');
      return undefined as T;
    }
  }

  async save(payload: SaveSettingDto): Promise<void> {
    const setting = await this.settingRepository.findOne({
      where: {
        key: payload.key,
      },
    });
    await this.cacheService.remove(payload.key).then(async () => {
      if (setting) {
        return await this.settingRepository.update(
          {
            key: payload.key,
          },
          {
            value: payload.value,
          },
        );
      }
      return await this.settingRepository.save(
        this.settingRepository.create(payload),
      );
    });
  }
}
