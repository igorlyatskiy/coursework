import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { GoogleUserData, UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUserByEmail(email: string) {
    const data = await this.userRepository.getByEmail(email);
    return data;
  }

  async createUser(userData: GoogleUserData) {
    const data = await this.userRepository.createUser(userData);
    return data;
  }

  async updateUser(updateUserDto: UpdateUserDto, user: UserEntity) {
    return this.userRepository.updateUser(updateUserDto, user);
  }

  async getTopUsers() {
    const data = await this.userRepository.getTopUsers();
    return data.map(this.getPublicUserData);
  }

  getPublicUserData(user: UserEntity) {
    return {
      username: user.username
        ? user.username
        : `${user.firstName} ${user.lastName}`,
      score: user.score,
      avatar: user.avatar,
      levels: user.levels,
    };
  }
}
