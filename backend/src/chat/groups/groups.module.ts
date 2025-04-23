import { Module } from '@nestjs/common';
import { JwtStrategyModule } from '../../common/jwt-strategy/jwt-strategy.module';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGroup } from './entities/chat-group.entity';
import { ChatGroupsRepository } from './repositories/chat-groups.repository';
import { ProfileModule } from '../../user/profile/profile.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
    imports: [
        JwtStrategyModule,
        TypeOrmModule.forFeature([ChatGroup]),
        ProfileModule,
        ChatsModule,
    ],
    controllers: [GroupsController],
    providers: [GroupsService, ChatGroupsRepository],
})
export class GroupsModule {}
