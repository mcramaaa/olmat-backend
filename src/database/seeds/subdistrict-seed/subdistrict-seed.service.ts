import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { KECAMATAN } from './KECAMATAN.constant';
import { Subdistricts } from 'src/entities/subdistricts.entity';

@Injectable()
export class SubdistrictSeedService {
  constructor(private readonly datasource: DataSource) {}

  async run() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        KECAMATAN.map(async (kecamatan) => {
          await queryRunner.manager.save(
            queryRunner.manager.create(Subdistricts, {
              id: kecamatan.ID_KECAMATAN,
              name: kecamatan.NAMA_KECAMATAN,
              city: { id: kecamatan.ID_KOTA },
            }),
          );
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
