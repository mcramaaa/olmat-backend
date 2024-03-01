import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Schools } from 'src/entities/schools.entity';
import { Users } from 'src/entities/users.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(private readonly datasource: DataSource) {}

  async run() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const school = await queryRunner.manager.findOneOrFail(Schools, {
      where: { id: 1 },
      relations: { city: { region: true } },
    });

    try {
      await queryRunner.manager.save(
        queryRunner.manager.create(Users, {
          name: 'User One',
          email: 'user@gmail.com',
          password: 'ggwp',
          phone: '08168',
          type: 'A',
          school,
          region: school.city.region,
        }),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
