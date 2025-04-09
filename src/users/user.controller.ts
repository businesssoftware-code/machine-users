import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(Number(id));
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() body) {
    return await this.userService.userLogin(body);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() body) {
    return await this.userService.createUser(body);
  }
}
