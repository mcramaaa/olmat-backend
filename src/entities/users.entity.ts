import { AuditTrail } from 'src/shared/utils/entity-helper';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payments } from './payments.entity';
import { Schools } from './schools.entity';
import { Regions } from './regions.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  type: string;

  @OneToMany(() => Payments, (payment) => payment.user)
  payments: Payments[];

  @ManyToOne(() => Schools, (school) => school.users, {
    nullable: false,
  })
  school: Schools;

  @ManyToOne(() => Regions, (region) => region.users, {
    nullable: false,
  })
  region: Regions;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
