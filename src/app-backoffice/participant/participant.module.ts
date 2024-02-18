import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { ParticipantController } from './participant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Participants])],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
