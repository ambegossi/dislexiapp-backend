import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Avatar from './Avatar';

@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  score: number;

  @Column('integer')
  level: number;

  @ManyToOne(() => Avatar, { cascade: true })
  @JoinColumn({ name: 'avatar_id' })
  avatar: Avatar | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Profile;
