import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { UserAuth } from '../../credentials/entities/user-auth.entity';
import { Message } from '../../../chat/messages/entities/message.entity';

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

    @OneToOne(() => UserAuth)
    @JoinColumn()
    userAuth: UserAuth;

    @OneToMany(() => Message, (message) => message.senderId)
    messages: Message[];
}
