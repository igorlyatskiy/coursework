import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/user.entity';

@Entity({ name: 'offline_game' })
export class OfflineGameEntity extends BaseEntity {
  constructor(player: UserEntity) {
    super();

    this.player = player;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @ManyToOne(() => UserEntity)
  player: UserEntity;

  @Column({ nullable: true })
  winnerColor: 'w' | 'b';
}
