import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { GoogleUserData, UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import _ from 'lodash';

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

  async updateMe(updateUserDto: UpdateUserDto, user: UserEntity) {
    return this.userRepository.updateMe(updateUserDto, user);
  }

  async updateUser(user: UserEntity, isAdminSuperUser: boolean) {
    if (isAdminSuperUser) {
      await this.userRepository.updateUser(user);
    } else {
      await this.userRepository.updateUserWithoutRoles(user);
    }
  }

  async getTopUsers() {
    const data = await this.userRepository.getTopUsers();
    return data.map(this.getPublicUserData);
  }

  async getAllUsers() {
    return this.userRepository.getUsers();
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

  async updateUserStatus(userId: string, status: boolean) {
    await this.userRepository.updateUserStatus(userId, status);
    return this.getAllUsers();
  }
}
