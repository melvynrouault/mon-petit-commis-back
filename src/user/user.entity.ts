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
    username: string;

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