import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
//import {UserProfile} from "../../profile/entities/user-profile.entity";

@Entity()
export class UserAuth {
    // @OneToOne(()=>UserProfile)
    // @JoinColumn()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    login: string;

    @Column('char', { length: 11, unique: true })
    phoneNumber: string;

    @Column('varchar', { length: 254, nullable: true, unique: true })
    email: string;

    @Column('text')
    password: string;

    @Column('boolean', { default:false} )
    isConfirmed:boolean
}
