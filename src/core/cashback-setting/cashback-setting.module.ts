import { Module } from '@nestjs/common';
import { CashbackSettingService } from './cashback-setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashbackSettings } from 'src/entities/cashback-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashbackSettings])],
  providers: [CashbackSettingService],
  exports: [CashbackSettingService],
})
export class CashbackSettingModule {}
