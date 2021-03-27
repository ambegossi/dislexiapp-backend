import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stimulus')
class Stimulus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  word: string;

  @Column()
  image: string;

  @Column()
  syllabic_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stimulus;
