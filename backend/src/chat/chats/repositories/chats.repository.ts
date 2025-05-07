import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { Message } from '../../messages/entities/message.entity';

@Injectable()
export class ChatsRepository {
    // DAL - Data Access Layer
    constructor(
        @InjectRepository(Chat)
        private repository: Repository<Chat>,
    ) {}

    async findChatById(chatId: string) {
        const chat = await this.repository.findOne({
            relations: {
                messages: true,
            },
            where: {
                id: chatId,
            },
        });
        if (!chat) throw new NotFoundException('Chat was not found!');
        return chat;
    }

    async findUserChats(userId: string): Promise<Chat[]> {
        const chats = await this.repository
            .createQueryBuilder('chat')
            .innerJoin('chat.users', 'filterUser', 'filterUser.id = :userId')
            .leftJoinAndSelect('chat.users', 'user')
            .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
            .leftJoinAndSelect('chat.messages', 'message')
            .setParameter('userId', userId)
            .select([
                'chat.id',
                'chat.type',
                'chat.name',
                'chat.createdAt',
                'chat.chatOwner',
                'message.id',
                'message.context',
                'message.senderId',
                'message.createdAt',
                'lastMessage.id',
                'lastMessage.context',
                'lastMessage.senderId',
                'lastMessage.createdAt',
                'user.id',
                'user.userName',
                'user.avatarUrl',
            ])
            .getMany();
        return chats;
    }

    async createAndSaveChat(chatDto: Partial<Chat>) {
        const chat = this.repository.create(chatDto);
        const newChat = await this.repository.save(chat);
        return newChat;
    }

    async updateChat(chatDto: Partial<Chat>) {
        return await this.repository.save(chatDto);
    }

    async deleteChat(chat: Chat) {
        return await this.repository.remove(chat);
    }
}
