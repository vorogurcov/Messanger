import { Module } from '@nestjs/common';
import { JwtStrategyModule } from '../../common/jwt-strategy/jwt-strategy.module';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsRepository } from './repositories/chats.repository';
import { ProfileModule } from '../../user/profile/profile.module';
import {CentrifugoModule} from "../../common/centrifugo/centrifugo.module";

@Module({
    imports: [
        JwtStrategyModule,
        TypeOrmModule.forFeature([Chat]),
        ProfileModule,
        CentrifugoModule,
    ],
    providers: [ChatsService, ChatsRepository],
    controllers: [ChatsController],
    exports: [ChatsService],
})
export class ChatsModule {}
