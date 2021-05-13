import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  font_family: string;

  @Column('float')
  speaking_rate: number;

  @Column('boolean')
  private_profile: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Settings;
