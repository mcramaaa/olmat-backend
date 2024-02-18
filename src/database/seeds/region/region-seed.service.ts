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
                ('BNDUG', 'Rayon Bandung', '01', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('CRBON', 'Rayon Cirebon', '03', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('JBDTK', 'Rayon Jabodetabek', '04', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('JMBER', 'Rayon Jember', '05', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('JOGJA', 'Rayon Yogyakarta', '18', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('KDIRI', 'Rayon Kediri', '07', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('KLMTN', 'Rayon Kalimantan', '06', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('LAIN2', 'Rayon Ponorogo', '13', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('LMGAN', 'Rayon Lamongan', '08', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MDIUN', 'Rayon Madiun', '09', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MDURA', 'Rayon Madura', '10', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('MLANG', 'Rayon Malang', '11', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('PPBLI', 'Rayon Papua Bali', '12', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('PWKTO', 'Rayon Banyumas', '02', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SLWSI', 'Rayon Sulawesi', '15', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SMTRA', 'Rayon Sumatra', '16', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SRBYA', 'Rayon Surabaya', '17', DEFAULT, DEFAULT, DEFAULT, NULL),
                ('SRKTA', 'Rayon Semarang', '14', DEFAULT, DEFAULT, DEFAULT, NULL);
            `);
    }
  }
}
