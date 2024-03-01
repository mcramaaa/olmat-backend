import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cities } from 'src/entities/cities.entity';
import { Degree } from 'src/entities/degree.entity';
import { Provincies } from 'src/entities/provincies.entity';
import { Schools } from 'src/entities/schools.entity';
import { Subdistricts } from 'src/entities/subdistricts.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SchoolSeedService {
  constructor(private readonly datasource: DataSource) {}
  async run() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const province = await queryRunner.manager.findOneOrFail(Provincies, {
      where: { id: '35' },
    });
    const city = await queryRunner.manager.findOneOrFail(Cities, {
      where: { id: '3525' },
    });

    const subdistrict = await queryRunner.manager.findOneOrFail(Subdistricts, {
      where: { id: 3783 },
    });

    const degree = await queryRunner.manager.findOneOrFail(Degree, {
      where: { id: '001' },
    });

    try {
      await queryRunner.manager.save(
        queryRunner.manager.create(Schools, {
          name: 'MTSN 2BANDUNG BARAT',
          email: 'ggwp@gmail.com',
          phone: '081684654',
          whatsapp: '084654321',
          address:
            'JL. SAMPORA SEKEAWI, SUKAMENAK, KEC. MARGAHAYU, KAB.BANDUNG',
          degree,
          subdistrict,
          city,
          province,
        }),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
