import { Module } from '@nestjs/common';
import { DegreeSeedService } from './degree-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Degree } from 'src/entities/degree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Degree])],
  providers: [DegreeSeedService],
})
export class DegreeSeedModule {}
