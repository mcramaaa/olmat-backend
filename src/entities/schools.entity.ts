import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Participants } from './participants.entity';
import { Cities } from './cities.entity';
import { Provincies } from './provincies.entity';
import { Subdistricts } from './subdistricts.entity';

@Entity()
export class Schools {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  degree: string;

  @Column()
  status: string;

  @Column()
  is_accept: boolean;

  @OneToMany(() => Participants, (participant) => participant.school)
  participants: Participants[];

  @ManyToOne(() => Provincies, (province) => province.schools, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  province: Provincies;

  @ManyToOne(() => Cities, (city) => city.schools, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  city: Cities;

  @ManyToOne(() => Subdistricts, (city) => city.schools, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  subdistrict: Subdistricts;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
