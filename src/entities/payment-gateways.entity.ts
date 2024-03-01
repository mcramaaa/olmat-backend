import { AuditTrail } from 'src/shared/utils/entity-helper';
import { EntityHelper } from 'src/shared/utils/entity-helper copy';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentGateways extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  provider: string;

  @Column()
  group: string;

  @Column()
  logo: string;

  @Column({ unique: true })
  code: string;

  @Column({ unsigned: true })
  fee_flat: number;

  @Column({ unsigned: true })
  fee_percentage: number;

  @Column({ unsigned: true })
  min_amount: number;

  @Column({ unsigned: true })
  max_amount: number;

  @Column({ unsigned: true })
  is_active: boolean;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
