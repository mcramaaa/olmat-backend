import { AuditTrail } from 'src/shared/utils/entity-helper';
import { Entity, Column, OneToMany } from 'typeorm';
import { Payments } from './payments.entity';

@Entity()
export class Users {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  nama: string;

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

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
