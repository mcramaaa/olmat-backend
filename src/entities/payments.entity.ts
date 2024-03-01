import { AuditTrail } from 'src/shared/utils/entity-helper';
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
import { EntityHelper } from 'src/shared/utils/entity-helper copy';
import { PaymentType } from 'src/shared/enums/payment.enum';
import { PaymentGateways } from './payment-gateways.entity';
import { Expose } from 'class-transformer';

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
  amount: number;

  @Column({ default: () => 'DATE_ADD(CURRENT_TIMESTAMP() , INTERVAL 24 HOUR)' })
  expired_at: Date;

  @Column({ type: 'enum', enum: PaymentType, default: PaymentType.PENDING })
  status: PaymentType;

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
