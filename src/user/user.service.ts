import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({where: {email: createUserDto.email}}) ;
    if(userExists) {
      throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const userPassword = createUserDto.password;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    createUserDto.password = hashedPassword;
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

  async login(loginUserDto: LoginUserDto) {
    const userExists = await this.userRepository.findOne({where: {email: loginUserDto.email}});
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if(userExists.password !== loginUserDto.password) {
      throw new HttpException('Invalid credentials', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const access_token = await this.jwtService.signAsync({id: userExists.id})
    return {access_token: access_token};
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({where: {id: id}});
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const userExists = await this.userRepository.findOne({where: {id: id}}) ;
    if(!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }
}
