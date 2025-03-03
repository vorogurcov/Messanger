import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    login:string;

    @Column('char', {length:11, unique:true})
    phoneNumber:string;

    @Column("varchar", { length: 254, nullable:true, unique:true })
    email:string;

    @Column('text')
    password:string;

    @Column('varchar', {length:255, nullable:true})
    avatarUrl:string;

}