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
             INSERT INTO degree (id, name) VALUES
                ('001', 'SMA'),
                ('002', 'SMP'),
                ('003', 'MTS'),
                ('004', 'SD'),
                ('005', 'MI');
            `);
    }
  }
}
