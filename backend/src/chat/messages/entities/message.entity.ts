import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
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
    senderId: string;

    @Column()
    @ManyToOne(() => Chat, (chat) => chat.messages)
    chatId: string;

    @Column({type:'timestamp', default:new Date().toISOString()})
    createdAt:string;
}
