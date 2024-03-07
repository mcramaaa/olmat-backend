import { PERMISSIONS } from 'src/shared/enums/permissions.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Admins } from './admins.entity';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';

@Entity()
export class AdminRole extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  permissions: PERMISSIONS[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;

  @OneToMany(() => Admins, (admin) => admin.role)
  @JoinColumn()
  admins: Admins[];
}
