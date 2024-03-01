import { AuditTrail } from 'src/shared/utils/entity-helper';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participants } from './participants.entity';
import { Cities } from './cities.entity';
import { Provincies } from './provincies.entity';
import { Subdistricts } from './subdistricts.entity';
import { Users } from './users.entity';
import { SchoolStatus } from 'src/shared/enums/school.enum';
import { Degree } from './degree.entity';
import { EntityHelper } from 'src/shared/utils/entity-helper copy';

@Entity()
export class Schools extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  whatsapp: string;

  @Column({ type: 'enum', enum: SchoolStatus, default: SchoolStatus.HITAM })
  status: SchoolStatus;

  @Column({ default: false })
  is_accept: boolean;

  @OneToMany(() => Participants, (participant) => participant.school)
  participants: Participants[];

  @OneToMany(() => Users, (user) => user.school)
  users: Users[];

  @ManyToOne(() => Provincies, (province) => province.schools, {
    nullable: false,
  })
  province: Provincies;

  @ManyToOne(() => Degree, (degree) => degree.schools, {
    nullable: false,
  })
  degree: Degree;

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
