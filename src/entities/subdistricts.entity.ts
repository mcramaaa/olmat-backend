import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from './cities.entity';
import { Schools } from './schools.entity';
import { AuditTrail } from 'src/shared/utils/entity-helper';

@Entity()
export class Subdistricts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Cities, (city) => city.subdistricts, {
    nullable: false,
  })
  city: Cities;

  @OneToMany(() => Schools, (school) => school.subdistrict)
  schools: Schools[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
