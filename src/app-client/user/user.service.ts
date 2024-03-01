import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly datasource: DataSource,
  ) {}

  async findOne(condition: EntityCondition<Users>) {
    return await this.userRepository.findOne({
      where: condition,
      relations: { school: { degree: true } },
    });
  }
}
