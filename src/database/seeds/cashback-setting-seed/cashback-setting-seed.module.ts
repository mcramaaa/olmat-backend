import { Module } from '@nestjs/common';
import { CashbackSettingSeedService } from './cashback-setting-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashbackSettings } from 'src/entities/cashback-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashbackSettings])],
  providers: [CashbackSettingSeedService],
})
export class CashbackSettingSeedModule {}
