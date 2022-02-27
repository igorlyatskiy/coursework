import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { GoogleUserData, UserEntity } from '../user/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private logger = new Logger('UserRepository');

  async getByEmail(email: string) {
    return UserEntity.findOne({ email });
  }

  async createUser(userData: GoogleUserData) {
    const user = new UserEntity(userData);
    await user.save();
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, user: UserEntity) {
    await UserEntity.update({ id: user.id }, updateUserDto);
  }
}
