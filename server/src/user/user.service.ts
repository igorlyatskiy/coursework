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
    const data = await this.userRepository.updateUser(updateUserDto, user);
  }
}
