import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

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

  @Expose({ name: 'image_url' })
  getImageUrl(): string {
    return `${process.env.APP_API_URL}/files/${this.image}`;
  }
}

export default Stimulus;
