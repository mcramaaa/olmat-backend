import { AuditTrail } from 'src/shared/utils/entity-helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Participants } from './participants.entity';
import { Users } from './users.entity';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unsigned: true })
  amount_participants: number;

  @Column({ unsigned: true })
  payment_amount: number;

  @Column({ unsigned: true })
  status: number;

  @Column({ unsigned: true })
  img: number;

  @OneToMany(() => Participants, (participant) => participant.payment)
  participants: Participants[];

  @ManyToOne(() => Users, (user) => user.payments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: Users;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
