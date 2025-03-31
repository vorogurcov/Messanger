import {
    Column,
    Entity,
    JoinTable,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 16 })
    type: string;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'timestamp' })
    createdAt: string;

    @OneToMany(() => Message, (message) => message.senderId)
    messages: Message[];

    @ManyToMany(() => UserProfile)
    @JoinTable()
    users: UserProfile[];
}
