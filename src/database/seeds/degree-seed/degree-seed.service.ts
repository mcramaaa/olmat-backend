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
                ('01', 'SMA', 100000),
                ('02', 'SMP', 75000),
                ('03', 'MTS', 75000),
                ('04', 'SD', 50000),
                ('05', 'MI', 50000);
            `);
    }
  }
}
