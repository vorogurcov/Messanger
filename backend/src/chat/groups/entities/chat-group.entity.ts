import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Entity()
export class ChatGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: false })
    name: string;

    @ManyToOne(() => UserProfile)
    groupOwner: UserProfile;

    @ManyToMany(() => Chat, (chat) => chat.group)
    chats: Chat[];
}
