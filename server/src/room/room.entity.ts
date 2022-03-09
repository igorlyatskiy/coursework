import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { GameEntity } from '../game/game.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
  constructor(name: string, creator: UserEntity) {
    super();
    this.name = name;
    this.creator = creator;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creatorId' })
  creator;

  @Column({ default: true })
  isRoomActive: boolean;

  @OneToOne(() => GameEntity, (game: GameEntity) => game.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'gameId' })
  game: GameEntity;
}
