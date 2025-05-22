import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ArrayContains, Repository} from 'typeorm';
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
                users: true,
                lastMessage: true,
                group: true
            },
            where: {
                id: chatId,
            },
        });
        if (!chat) throw new NotFoundException('Chat was not found!');
        return chat;
    }

    async getChatMessages(userId:string, chatId: string) {
        console.log(userId)
        const chat = await this.repository.findOne({
            relations: {
                messages:true,
                users:true,
            },
            where: {
                id: chatId,
                users:{
                    id:userId,
                }
            },
            order: {
                messages: {
                    createdAt: 'ASC',
                }
            }
        })

        if (!chat) throw new NotFoundException('Chat was not found!');

        return chat.messages;
    }


    async findUserChats(userId: string): Promise<Chat[]> {
        const chats = await this.repository
            .createQueryBuilder('chat')
            .innerJoin('chat.users', 'filterUser', 'filterUser.id = :userId')
            .leftJoinAndSelect('chat.users', 'user')
            .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
            .leftJoinAndSelect('chat.group','groups')
            .leftJoinAndSelect('chat.chatOwner', 'owner')
            .setParameter('userId', userId)
            .select([
                'chat.id',
                'chat.type',
                'chat.name',
                'chat.createdAt',
                'chat.chatOwner',
                'lastMessage.id',
                'lastMessage.context',
                'lastMessage.senderId',
                'lastMessage.createdAt',
                'user.id',
                'user.userName',
                'user.avatarUrl',
                'groups.id',
                'groups.name',
                'owner.id',
                'owner.userName'
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
