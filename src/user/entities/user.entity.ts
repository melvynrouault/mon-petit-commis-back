import { Recipe } from 'src/recipe/entities/recipe.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
      })    
    id: number;

    @Column({
        nullable: false,
        default: '',
      })    
    firstname: string;

    @Column({
      nullable: false,
      default: '',
    })    
    lastname: string;

    @Column({
      nullable: false,
      default: '',
    })    
    email: string;
    
    @Column({
      nullable: false,
      default: '',
    })    
    password: string;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];

}