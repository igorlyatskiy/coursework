import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'game' })
export class GameEntity extends BaseEntity {
  constructor(roomId: string) {
    super();
    this.id = roomId;
  }

  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  updatedDate: string;

  @ManyToOne(() => UserEntity)
  whitePlayer: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  winner: UserEntity;

  @Column()
  type: string;
}
