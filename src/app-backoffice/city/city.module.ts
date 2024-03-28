import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from 'src/entities/cities.entity';
import { CityController } from './city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  providers: [CityService],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}
