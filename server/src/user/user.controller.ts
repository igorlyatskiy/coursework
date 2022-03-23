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

@Controller()
@UseGuards(AuthGuard('jwt'), UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('user')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(updateUserDto, req.user);
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
