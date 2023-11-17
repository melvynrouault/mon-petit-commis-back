import { User } from 'src/user/entities/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

@Entity('recipe')
export class Recipe {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'recipe_id',
    })    
    id: number;

    @Column({
        nullable: false,
        default: '',
    })    
    title: string;

    @Column({
        nullable: false,
        default: '',
    })    
    link: string;

    @Column({
        nullable: false,
        default: '',
    })    
    description: string;
    
    @Column({
        nullable: false,
        default: '',
    })    
    photo: string;

    @ManyToOne(() => User, (user) => user.recipes)
    user: User;
}
