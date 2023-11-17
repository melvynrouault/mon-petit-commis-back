import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({where: {email: createUserDto.email}}) ;
    console.log(userExists);
    if(userExists) {
        throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {'recipes': true}
    });
  }

  async findOne(id: number) {
    const userExists = await this.userRepository.findOne({where: {id: id}, relations: {'recipes': true}});
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userExists;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({where: {id: id}});
    console.log(userExists);
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const userExists = await this.userRepository.findOne({where: {id: id}}) ;
    console.log(userExists);
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }
}
