import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Profile from './Profile';
import Settings from './Settings';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  profile_id: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToOne(() => Settings, { cascade: true })
  @JoinColumn({ name: 'settings_id' })
  settings: Settings;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
