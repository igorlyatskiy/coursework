import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(updateUserDto, req.user);
  }
}
