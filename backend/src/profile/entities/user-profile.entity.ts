import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserProfile{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    userName:string;

    @Column('date')
    birthDate:string;

    @Column('varchar', { length: 255, nullable: true })
    avatarUrl: string;

    @Column('text')
    bio:string;

    @Column('boolean')
    isOnline:boolean;

    @Column('timestamp')
    lastSeen:string;
}