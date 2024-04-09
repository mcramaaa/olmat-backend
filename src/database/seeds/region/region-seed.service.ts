import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regions } from 'src/entities/regions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionSeedService {
  constructor(
    @InjectRepository(Regions) private repository: Repository<Regions>,
  ) {}
  async run() {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.query(`
            INSERT INTO regions (id, name, region_code, created_at, created_by, updated_at, updated_by) VALUES
                ('BDG', 'Rayon Bandung', '01', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('CRBN', 'Rayon Cirebon', '03', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('JBDT', 'Rayon Jabodetabek', '04', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('JBR', 'Rayon Jember', '05', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('YGY', 'Rayon Yogyakarta', '18', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('KDR', 'Rayon Kediri', '07', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('KLMT', 'Rayon Kalimantan', '06', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('PNRG', 'Rayon Ponorogo', '13', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('LMG', 'Rayon Lamongan', '08', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MDN', 'Rayon Madiun', '09', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MDR', 'Rayon Madura', '10', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MLG', 'Rayon Malang', '11', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('PPBL', 'Rayon Papua Bali', '12', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('BYMS', 'Rayon Banyumas', '02', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SLWS', 'Rayon Sulawesi', '15', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SMTR', 'Rayon Sumatra', '16', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SBY', 'Rayon Surabaya', '17', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SMG', 'Rayon Semarang', '14', DEFAULT, DEFAULT, DEFAULT, NULL);
            `);
    }
  }
}
