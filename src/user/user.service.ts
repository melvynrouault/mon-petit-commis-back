import { Body, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const userExists = await this.usersRepository.findOne({where: {id: id}});
        if(!userExists) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return userExists;
    }

    async createOne(user: User): Promise<User> {
        const userExists = await this.usersRepository.findOne({where: {email: user.email}}) ;
        console.log(userExists);
        if(userExists) {
            throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    // TODO: Trouver la vrai façon de faire pour update en DB
    async editOne(id: number, user: User): Promise<User> {
        const userExists = await this.usersRepository.findOne({where: {id: id}}) ;
        console.log(userExists);
        if(!userExists) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.delete(id);
        const updatedUser = this.usersRepository.create(user)
        // const updateUser = this.usersRepository.update(id, {where: {id}, data: user});
        return this.usersRepository.save(updatedUser);
    }

    async deleteOne(id: number) {
        const userExists = await this.usersRepository.findOne({where: {id: id}}) ;
        console.log(userExists);
        if(!userExists) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.usersRepository.delete(id);
    }
}
