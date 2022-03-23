import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { GoogleUserData, UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private logger = new Logger('UserRepository');
  private readonly TOP_USERS_LIMIT = 50;

  async getUsers() {
    return UserEntity.find();
  }

  async getByEmail(email: string) {
    return UserEntity.findOne({ email });
  }

  getById(id: string) {
    return UserEntity.findOne({ id });
  }

  async createUser(userData: GoogleUserData) {
    const user = new UserEntity(userData);
    await user.save();
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, user: UserEntity) {
    await UserEntity.update({ id: user.id }, updateUserDto);
  }

  async updateUserStatus(userId: string, status: boolean) {
    await UserEntity.update(
      {
        id: userId,
      },
      {
        isActive: status,
      },
    );
  }

  async getTopUsers() {
    return UserEntity.find({
      take: this.TOP_USERS_LIMIT,
      order: {
        score: 'DESC',
      },
      where: {
        isActive: true,
      },
    });
  }
}
