import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface GoogleUserData {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  constructor(userData: GoogleUserData) {
    super();
    if (userData) {
      this.email = userData.email;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.avatar = userData.avatar;
    }
    this.roles = ['user'];
    this.levels = ['Beginner'];
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column('text', { array: true, default: [] })
  levels: string[];

  @Column('text', { array: true, default: [] })
  roles: string[];

  @Column({ default: 0 })
  score: number;

  @Column({ nullable: true })
  avatar: string;
}
