import { Module } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { DegreeController } from './degree.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Degree } from 'src/entities/degree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Degree])],
  controllers: [DegreeController],
  providers: [DegreeService],
  exports: [DegreeService],
})
export class DegreeModule {}
