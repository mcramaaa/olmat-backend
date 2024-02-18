import { Injectable } from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from 'src/entities/degree.entity';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';

@Injectable()
export class DegreeService {
  constructor(
    @InjectRepository(Degree) private repository: Repository<Degree>,
  ) {}

  async create(createDegreeDto: CreateDegreeDto) {
    return await this.repository.save(this.repository.create(createDegreeDto));
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(
    condition: EntityCondition<Degree>,
  ): Promise<NullableType<Degree>> {
    return await this.repository.findOne({ where: condition });
  }

  // update(id: number, updateDegreeDto: UpdateDegreeDto) {
  //   return `This action updates a #${id} degree`;
  // }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
