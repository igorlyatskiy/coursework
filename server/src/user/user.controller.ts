import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from '../auth/role.decorator';
import { Role } from '../Constants';
import { RoleGuard } from '../auth/guards/role.guard';
import { ToggleUserStatusDto } from './dto/toggleUserStatus.dto';
import { UserGuard } from '../auth/guards/user.guard';
import { UserEntity } from './user.entity';

@Controller()
@UseGuards(AuthGuard('jwt'), UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('user')
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateMe(updateUserDto, req.user);
  }

  @Get('top')
  getTopUsers() {
    return this.userService.getTopUsers();
  }

  @Get('users')
  @Roles(Role.admin)
  @UseGuards(RoleGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('users')
  @Roles(Role.admin)
  @UseGuards(RoleGuard)
  async updateUser(@Body() body: UserEntity, @Req() req) {
    await this.userService.updateUser(body, req.user.isSuperUser);
  }

  @Patch('users/:userId/status')
  @Roles(Role.admin)
  @UseGuards(RoleGuard)
  async toggleUserStatus(
    @Body() toggleUserStatusDto: ToggleUserStatusDto,
    @Req() req,
  ) {
    if (!req.params.userId) {
      throw new BadRequestException('User id should not be empty');
    }
    return this.userService.updateUserStatus(
      req.params.userId,
      toggleUserStatusDto.status,
    );
  }
}
