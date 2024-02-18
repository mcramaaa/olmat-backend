import { Entity, Column, OneToMany } from 'typeorm';
import { Schools } from './schools.entity';

@Entity()
export class Degree {
  @Column({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Schools, (school) => school.degree)
  schools: Schools[];
}
