import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { JwtStrategyModule } from '../../common/jwt-strategy/jwt-strategy.module';
import { MessagesService } from './messages.service';
import { ChatsModule } from '../chats/chats.module';
import { MessagesRepository } from './repositories/messages.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        JwtStrategyModule,
        ChatsModule,
    ],
    providers: [MessagesService, MessagesRepository],
    controllers: [MessagesController],
})
export class MessagesModule {}
