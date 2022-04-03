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

@Entity({ name: 'ai_game' })
export class AiGameEntity extends BaseEntity {
  constructor(player: UserEntity, level: number) {
    super();

    this.player = player;
    this.level = level as 1 | 2 | 3;
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

  @Column({ nullable: true })
  isDraw: boolean;

  @Column()
  level: 1 | 2 | 3;
}
