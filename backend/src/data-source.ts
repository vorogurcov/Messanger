import { DataSource } from 'typeorm';
import { UserAuth } from './user/credentials/entities/user-auth.entity';
import { UserProfile } from './user/profile/entities/user-profile.entity';
import { UserProfileAndAuth1742557853253 } from './common/migration/schema/1742557853253-UserProfileAndAuth';
import { UserProfileAndAuthSeed1742557865532 } from './common/migration/seed/1742557865532-UserProfileAndAuthSeed';
import { Message } from './chat/messages/entities/message.entity';
import { Chat } from './chat/chats/entities/chat.entity';
import { ChatsAndMessages1744218222284 } from './common/migration/schema/1744218222284-ChatsAndMessages';
import { ChatsAndMessagesSeed1744218244396 } from './common/migration/seed/1744218244396-ChatsAndMessagesSeed';
import { ChatGroup } from './chat/groups/entities/chat-group.entity';
import { ChatGroups1745410568577 } from './common/migration/schema/1745410568577-ChatGroups';
import { ChatGroupsSeed1745410591369 } from './common/migration/seed/1745410591369-ChatGroupsSeed';
import { MessagesSeed1745422286364 } from './common/migration/seed/1745422286364-MessagesSeed';

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    type: process.env.DB_PROVIDER as 'postgres' | 'mongodb',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [UserAuth, UserProfile, Chat, Message, ChatGroup],
    migrations: [
        UserProfileAndAuth1742557853253,
        UserProfileAndAuthSeed1742557865532,
        ChatsAndMessages1744218222284,
        ChatsAndMessagesSeed1744218244396,
        ChatGroups1745410568577,
        ChatGroupsSeed1745410591369,
        MessagesSeed1745422286364,
    ],
});
