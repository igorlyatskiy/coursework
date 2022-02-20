import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { GoogleUserData } from './user.entity';

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
}
