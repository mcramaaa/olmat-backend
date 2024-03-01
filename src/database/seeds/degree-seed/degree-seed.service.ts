import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from 'src/entities/degree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DegreeSeedService {
  constructor(
    @InjectRepository(Degree) private repository: Repository<Degree>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.query(`
             INSERT INTO degree (id, name, register_price) VALUES
                ('001', 'SMA', 100000),
                ('002', 'SMP', 75000),
                ('003', 'MTS', 75000),
                ('004', 'SD', 50000),
                ('005', 'MI', 50000);
            `);
    }
  }
}
