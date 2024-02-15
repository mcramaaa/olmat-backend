import { Entity, Column, OneToMany } from 'typeorm';
import { Cities } from './cities.entity';
import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Schools } from './schools.entity';

@Entity()
export class Provincies {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Cities, (city) => city.province)
  cities: Cities[];

  @OneToMany(() => Schools, (school) => school.province)
  schools: Schools[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
