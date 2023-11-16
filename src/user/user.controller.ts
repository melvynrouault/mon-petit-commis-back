import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public findAllUsers() {
      return this.userService.findAll();
    }

    @Get(':id')
    public findOneUser(@Param('id') id: number) {
      return this.userService.findOne(id);
    }

    @Post()
    public createOneUser(@Body() user: User) {
      return this.userService.createOne(user);
    }

    @Patch(':id')
    public editOneUser(@Param('id') id: number, @Body() user: User) {
      return this.userService.editOne(id, user)
    }

    @Delete(':id')
    public deleteOneUser(@Param('id') id: number) {
      return this.userService.deleteOne(id);
    }
}
