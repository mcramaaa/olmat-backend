import { Global, Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingController } from './setting.controller';
import { Setting } from 'src/entities/setting.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
