import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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

}
