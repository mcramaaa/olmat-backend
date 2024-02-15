import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cities } from './cities.entity';
import { Schools } from './schools.entity';

@Entity()
export class Subdistricts {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Cities, (city) => city.subdistricts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  city: Cities;

  @OneToMany(() => Schools, (school) => school.subdistrict)
  schools: Schools[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
