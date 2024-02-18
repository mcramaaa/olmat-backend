import { Module } from '@nestjs/common';
import { CitySeedService } from './city-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from 'src/entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  providers: [CitySeedService],
})
export class CitySeedModule {}
