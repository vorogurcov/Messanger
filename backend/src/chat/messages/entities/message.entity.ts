import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    context: string;

    @Column()
    @ManyToOne(() => UserProfile, (user) => user.messages)
    @JoinColumn({ name: 'senderId' })
    senderId: string;

    @Column()
    @ManyToOne(() => Chat, (chat) => chat.messages)
    @JoinColumn({ name: 'chatId' })
    chatId: string;

    @Column({ type: 'timestamp', default: new Date().toISOString() })
    createdAt: string;
}
