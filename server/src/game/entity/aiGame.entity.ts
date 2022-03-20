import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/user.entity';

@Entity({ name: 'ai_game' })
export class AiGameEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @ManyToOne(() => UserEntity)
  player: UserEntity;

  @Column({ default: 'w' })
  playerColor: 'w' | 'b';

  @Column({ nullable: true })
  winnerColor: 'w' | 'b';
}
