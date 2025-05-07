import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ChatsService } from '../chats/services/chats.service';
import { Message } from './entities/message.entity';
import { MessagesRepository } from './repositories/messages.repository';

@Injectable()
export class MessagesService {
    constructor(
        private chatsService: ChatsService,
        private messagesRepository: MessagesRepository,
    ) {}
    async getChatMessages(userId: string, chatId: string) {
        try {
            const userChats = await this.chatsService.getUserChats(userId);
            if (!userChats.map((chat) => chat.id).includes(chatId))
                throw new ForbiddenException(
                    'You do not have permission to look through this chat',
                );
            const chat = await this.chatsService.getChatById(chatId);
            console.log(chat);
            return chat.messages;
        } catch (error) {
            throw error;
        }
    }

    async createChatMessage(
        userId: string,
        chatId: string,
        createMessageDto: CreateMessageDto,
    ) {
        try {
            const userChats = await this.chatsService.getUserChats(userId);
            if (!userChats.map((chat) => chat.id).includes(chatId))
                throw new ForbiddenException(
                    'You do not have permission to change this chat',
                );
            // TODO: Business logic

            const message = await this.messagesRepository.saveMessageToChat(
                createMessageDto,
                userId,
                chatId,
            );
            return message;
        } catch (error) {
            throw error;
        }
    }

    async updateChatMessage(
        userId: string,
        chatId: string,
        messageId: string,
        updateMessageDto: UpdateMessageDto,
    ) {
        try {
            const userChats = await this.chatsService.getUserChats(userId);
            if (!userChats.map((chat) => chat.id).includes(chatId))
                throw new ForbiddenException(
                    'You do not have permission to change this chat',
                );
            return await this.messagesRepository.updateChatMessage(
                updateMessageDto,
                userId,
                chatId,
                messageId,
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteChatMessage(userId: string, chatId: string, messageId: string) {
        try {
            const userChats = await this.chatsService.getUserChats(userId);
            if (!userChats.map((chat) => chat.id).includes(chatId))
                throw new ForbiddenException(
                    'You do not have permission to delete in this chat',
                );

            return await this.messagesRepository.deleteChatMessage(
                userId,
                chatId,
                messageId,
            );

            // TODO: Change lastMessage для chat с id === chatId
        } catch (error) {
            throw error;
        }
    }
}
