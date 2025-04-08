import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatsRepository {
    // DAL - Data Access Layer
    constructor(
        @InjectRepository(Chat)
        private repository: Repository<Chat>,
    ) {}

    async findChatById(chatId: string) {
        const chat = await this.repository.findOneBy({
            id: chatId,
        });
        if (!chat) throw new NotFoundException('Chat was not found!');
        return chat;
    }

    async findUserChats(userId: string): Promise<Chat[]> {
        const chats = await this.repository
            .createQueryBuilder('chat')
            .innerJoin('chat.users', 'filterUser', 'filterUser.id = :userId')
            .leftJoinAndSelect('chat.users', 'user')
            .setParameter('userId', userId)
            .select([
                'chat.id',
                'chat.type',
                'chat.name',
                'chat.createdAt',
                'chat.chatOwner',
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
