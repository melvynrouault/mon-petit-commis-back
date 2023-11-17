import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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


    @Column({
      nullable: false,
      default: ''
    })
    name: string;

    @Column({
      nullable: false,
      default: ''
    })
    phoneNumber: string;

}