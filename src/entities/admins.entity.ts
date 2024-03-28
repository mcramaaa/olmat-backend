import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { make } from 'src/shared/utils/hash';
import { AdminRole } from './admin-role.entity';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';

@Entity()
export class Admins extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = make(this.password);
    }
  }

  @ManyToOne(() => AdminRole, (role) => role.admins, {
    nullable: false,
  })
  @JoinColumn()
  role: AdminRole;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
