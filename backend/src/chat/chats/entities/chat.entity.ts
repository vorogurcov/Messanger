import {
    Column,
    Entity,
    JoinTable,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
    JoinColumn,
    ManyToOne, OneToOne,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';
import {TypeEnumDto} from "../dto/type-enum.dto";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 16 })
    type: TypeEnumDto;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'timestamp' })
    createdAt: string;

    @ManyToOne(() => UserProfile, { eager: true })
    @JoinColumn()
    chatOwner: UserProfile;

    @OneToOne(() => Message)
    @JoinColumn()
    lastMessage:Message

    @OneToMany(() => Message, (message) => message.chatId)
    messages: Message[];

    @ManyToMany(() => UserProfile, { cascade: ['remove'] })
    @JoinTable()
    users: UserProfile[];
}
