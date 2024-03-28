import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincies } from 'src/entities/provincies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceSeedService {
  constructor(
    @InjectRepository(Provincies) private repository: Repository<Provincies>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.query(`
            INSERT INTO provincies (id, name, created_at, created_by, updated_at, updated_by) VALUES
                ('11', 'ACEH', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('12', 'SUMATERA UTARA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('13', 'SUMATERA BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('14', 'RIAU', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('15', 'JAMBI', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('16', 'SUMATERA SELATAN', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('17', 'BENGKULU', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('18', 'LAMPUNG', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('19', 'KEPULAUAN BANGKA BELITUNG', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('21', 'KEPULAUAN RIAU', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('31', 'DKI JAKARTA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('32', 'JAWA BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('33', 'JAWA TENGAH', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('34', 'DI YOGYAKARTA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('35', 'JAWA TIMUR', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('36', 'BANTEN', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('51', 'BALI', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('52', 'NUSA TENGGARA BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('53', 'NUSA TENGGARA TIMUR', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('61', 'KALIMANTAN BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('62', 'KALIMANTAN TENGAH', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('63', 'KALIMANTAN SELATAN', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('64', 'KALIMANTAN TIMUR', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('65', 'KALIMANTAN UTARA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('71', 'SULAWESI UTARA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('72', 'SULAWESI TENGAH', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('73', 'SULAWESI SELATAN', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('74', 'SULAWESI TENGGARA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('75', 'GORONTALO', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('76', 'SULAWESI BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('81', 'MALUKU', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('82', 'MALUKU UTARA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('91', 'PAPUA BARAT', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL),
                ('94', 'PAPUA', '2024-02-18 09:17:32.093573', 'System', '2024-02-18 09:17:32.093573', NULL);
            `);
    }
  }
}
