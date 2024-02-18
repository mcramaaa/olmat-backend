import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schools } from 'src/entities/schools.entity';
import { SchoolController } from './school.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schools])],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
