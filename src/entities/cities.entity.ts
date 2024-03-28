import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Provincies } from './provincies.entity';
import { Regions } from './regions.entity';
import { Subdistricts } from './subdistricts.entity';
import { Schools } from './schools.entity';
import { AuditTrail } from 'src/shared/utils/entity-helper';

@Entity()
export class Cities {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Provincies, (province) => province.cities, {
    nullable: false,
  })
  province: Provincies;

  @ManyToOne(() => Regions, (region) => region.cities, {
    nullable: false,
  })
  region: Regions;

  @OneToMany(() => Subdistricts, (subdistrict) => subdistrict.city)
  subdistricts: Subdistricts[];

  @OneToMany(() => Schools, (school) => school.city)
  schools: Schools[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
