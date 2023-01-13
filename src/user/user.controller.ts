import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public findAllUsers() {
      return this.userService.findAll();
    }
    

    @Post()
    public createUser(@Body() user: User) {
      return this.userService.createUser(user);
    }
}
