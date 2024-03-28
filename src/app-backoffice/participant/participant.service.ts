import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Repository } from 'typeorm';
import { UpdateParticipantDTO } from './dto/update-participant.dto';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participants)
    private repository: Repository<Participants>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Participants[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Participants>,
  ): Promise<NullableType<Participants>> {
    return await this.repository.findOne({ where: condition });
  }

  async update(
    payload: UpdateParticipantDTO,
    id: string,
    img?: string,
    attachment?: string,
  ): Promise<void> {
    const participant = await this.findOne({ id });
    if (!participant) throw new BadRequestException();

    if (img) {
      participant.img = img;
    }
    if (attachment) {
      participant.attachment = attachment;
    }

    Object.assign(participant, {
      name: payload.name,
      birth: payload.birth,
      phone: payload.phone,
      email: payload.email,
      gender: payload.gender,
    });

    await this.repository.save(participant);
  }
}
