import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    userName: string;

    @Column('date', { nullable: true })
    birthDate: string;

    @Column('varchar', { length: 255, nullable: true })
    avatarUrl: string;

    @Column('text', { default: 'Programmer from Saint-Petersburg' })
    bio: string;

    @Column('boolean', { default: false })
    isOnline: boolean;

    @Column('timestamp', { nullable: true })
    lastSeen: string;
}
