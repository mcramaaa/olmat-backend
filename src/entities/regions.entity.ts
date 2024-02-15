import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Entity, Column, OneToMany } from 'typeorm';
import { Cities } from './cities.entity';

@Entity()
export class Regions {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column()
  region_code: string;

  @OneToMany(() => Cities, (city) => city.region)
  cities: Cities[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
