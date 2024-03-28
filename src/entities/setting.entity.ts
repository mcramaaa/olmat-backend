import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'setting' })
export class Setting extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ type: 'longtext' })
  value: string;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
