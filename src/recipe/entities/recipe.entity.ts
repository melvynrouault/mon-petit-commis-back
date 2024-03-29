import { User } from 'src/user/entities/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

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
        nullable: true,
        default: '',
    })    
    link: string;

    @Column({
        nullable: true,
        default: '',
    })    
    description: string;
    
    @Column({
        nullable: false,
        default: '',
    })    
    photoPath: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.recipes)
    user: User;
}
