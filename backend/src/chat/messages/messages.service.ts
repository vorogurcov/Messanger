import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ChatsService } from '../chats/services/chats.service';
import { Message } from './entities/message.entity';
import { MessagesRepository } from './repositories/messages.repository';
import {CentrifugoService} from "../../common/centrifugo/centrifugo.service";

@Injectable()
export class MessagesService {
    constructor(
        private chatsService: ChatsService,
        private messagesRepository: MessagesRepository,
        private centrifugoService: CentrifugoService,
    ) {}
    async getChatMessages(userId: string, chatId: string) {
        try {
            return await this.chatsService.getChatMessages(userId, chatId);
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

            const message = await this.messagesRepository.saveMessageToChat(
                createMessageDto,
                userId,
                chatId,
            );

            await this.chatsService.updateLastMessage(chatId, message)

            await this.centrifugoService.centrifugoClient.publish({
                channel:`chat-${chatId}`,
                data:{
                    createChatMessage:{
                        chatId,
                        message,
                    }
                }
            })


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
            const message = await this.messagesRepository.updateChatMessage(
                updateMessageDto,
                userId,
                chatId,
                messageId,
            );

            const lastMessage = await this.messagesRepository.findLastMessage(chatId)
            if(lastMessage.id === messageId)
                await this.chatsService.updateLastMessage(chatId, message)

            await this.centrifugoService.centrifugoClient.publish({
                channel:`chat-${chatId}`,
                data:{
                    updateChatMessage:{
                        chatId,
                        message,
                    }
                }
            })

            return message;

        } catch (error) {
            throw error;
        }
    }

    async deleteChatMessage(userId: string, chatId: string, messageId: string) {
        const chat = await this.chatsService.getChatById(chatId);

        if (!chat) throw new NotFoundException('Chat not found');

        const chatMessages = await this.getChatMessages(userId, chatId);

        const isParticipant = chat.users.some((user) => user.id === userId);
        if (!isParticipant) {
            throw new ForbiddenException(
                'You do not have permission to delete in this chat',
            );
        }

        const message =
            await this.messagesRepository.findMessageById(messageId);
        if (!message) {
            throw new NotFoundException('Message not found!');
        }

        if (message.senderId !== userId) {
            throw new ForbiddenException('You can not delete this message');
        }

        if (chat.lastMessage?.id === messageId) {
            const remainingMessages = chatMessages.filter(
                (m) => m.id !== messageId,
            );

            const newLastMessage = remainingMessages[remainingMessages.length-1] ?? null;

            await this.chatsService.updateLastMessage(chatId, newLastMessage);
        }

        const mes = await this.messagesRepository.deleteChatMessage(message);

        await this.centrifugoService.centrifugoClient.publish({
            channel:`chat-${chatId}`,
            data:{
                deleteChatMessage:{
                    chatId,
                    mes,
                }
            }
        })


        return mes;
    }
}
