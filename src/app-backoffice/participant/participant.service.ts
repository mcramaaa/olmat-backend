import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Like, Repository } from 'typeorm';
import { UpdateParticipantDTO } from './dto/update-participant.dto';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { TParticipantType } from 'src/shared/types/filter.type';
import { ParticipantStatus } from 'src/shared/enums/participants.enum';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participants)
    private repository: Repository<Participants>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filter: TParticipantType,
  ): Promise<[Participants[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations: { school: { degree: true } },
        where: {
          name: filter.name ? Like(`%${filter.name}%`) : undefined,
          school: {
            province: filter.province ? { id: filter.province } : undefined,
            city: filter.city ? { id: filter.city } : undefined,
            subdistrict: filter.subdistrict
              ? { id: filter.subdistrict }
              : undefined,
            degree: filter.degree ? { id: filter.degree } : undefined,
            id: filter.school ? filter.school : undefined,
          },
          status: ParticipantStatus.ACTIVE,
        },
      });
    } catch (error) {
      console.log(error);
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
