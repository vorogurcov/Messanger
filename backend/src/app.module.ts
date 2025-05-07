import { Module } from '@nestjs/common';
import { AuthModule } from './user/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ProfileModule } from './user/profile/profile.module';
import { ChatsModule } from './chat/chats/chats.module';
import { GroupsModule } from './chat/groups/groups.module';
import { MessagesModule } from './chat/messages/messages.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        AuthModule,
        ProfileModule,
        ChatsModule,
        GroupsModule,
        MessagesModule,
    ],
})
export class AppModule {}
