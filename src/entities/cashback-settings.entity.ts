import { EntityHelper } from 'src/shared/utils/entity-helper';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CashbackSettings extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true })
  amount: number;

  @Column({ unsigned: true })
  free: number;
}
