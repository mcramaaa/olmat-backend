import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Payments } from './payments.entity';
import { Schools } from './schools.entity';

@Entity()
export class Participants {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  birth: string;

  @Column()
  img: string;

  @Column()
  attachment: string;

  @Column()
  status: string;

  @ManyToOne(() => Payments, (payment) => payment.participants, {
    nullable: false,
  })
  payment: Payments;

  @ManyToOne(() => Schools, (school) => school.participants, {
    nullable: false,
  })
  school: Schools;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
