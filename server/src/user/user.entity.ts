import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @Column()
  username: string;

  @Column('text', { array: true, default: [] })
  levels: string[];

  @Column({ default: 0 })
  score: number;

  @Column({ nullable: true })
  avatar: string;
}
