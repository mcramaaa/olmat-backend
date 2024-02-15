import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditTrail {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true, default: 'System' })
  @Expose({ groups: ['admin'] })
  created_by: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @Expose({ groups: ['admin'] })
  updated_by: string;
}
