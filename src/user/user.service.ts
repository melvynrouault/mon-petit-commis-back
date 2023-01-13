import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // //template de méthode
    // nomMethode(parametre: string): typeRetour {
    //     // do STUFF
    //     // var resultat = true
    //     return resultatSousFormatDuTypeDeRetour
    // }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    createUser(user: User): Promise<User> {

        // TODO: Vérifier si l'utilisateur existe déjà en vérifiant le username
        
        // formate et on stocke dans la variable newUser l'utilisateur
        const newUser = this.usersRepository.create(user);
        // la on envoie à la base de donnée le nouvel utilisateur formaté
        return this.usersRepository.save(newUser);
    }
}
