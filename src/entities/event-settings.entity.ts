import { EntityHelper } from 'src/shared/utils/entity-helper';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EventSettings extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', precision: 6 })
  start: Date;

  @Column({ type: 'timestamp', precision: 6 })
  end: Date;

  @Column({ unsigned: true })
  amount: number;

  @Column({ unsigned: true })
  free: number;
}
