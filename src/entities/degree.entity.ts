import { Entity, Column, OneToMany } from 'typeorm';
import { Schools } from './schools.entity';
import { EntityHelper } from 'src/shared/utils/entity-helper';

@Entity()
export class Degree extends EntityHelper {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column({ unsigned: true })
  register_price: number;

  @OneToMany(() => Schools, (school) => school.degree)
  schools: Schools[];
}
