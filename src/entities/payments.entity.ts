import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Participants } from './participants.entity';
import { Users } from './users.entity';
import { PaymentGateways } from './payment-gateways.entity';
import { Expose } from 'class-transformer';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { PaymentStatus } from 'src/shared/enums/payment.enum';

@Entity()
export class Payments extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoice: string;

  @Column()
  code: string;

  @Column({ type: 'json', nullable: true })
  action: object;

  @Expose({ groups: ['admin'] })
  @Column({ type: 'json', nullable: true })
  callback: object;

  @Column({ unsigned: true })
  participant_amounts: number;

  @Column({ unsigned: true })
  fee: number;

  @Column({ unsigned: true })
  amount: number;

  @Column({ unsigned: true })
  total_amount: number;

  @Column()
  expired_at: Date = new Date(Date.now() + 24 * 60 * 60 * 1000);

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @OneToMany(() => Participants, (participant) => participant.payment)
  participants: Participants[];

  @ManyToOne(() => PaymentGateways)
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  paymentGateway: PaymentGateways;

  @ManyToOne(() => Users, (user) => user.payments, {
    nullable: false,
  })
  user: Users;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
