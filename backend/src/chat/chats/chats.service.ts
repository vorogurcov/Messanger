import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatsRepository } from './repositories/chats.repository';
import { Chat } from './entities/chat.entity';
import { UserProfile } from '../../user/profile/entities/user-profile.entity';
import { ProfileService } from '../../user/profile/profile.service';
import { Message } from '../messages/entities/message.entity';

@Injectable()
export class ChatsService {
    constructor(
        private chatsRepository: ChatsRepository,
        private profileService: ProfileService,
    ) {}
    async getUserChats(userId: string) {
        const chats = await this.chatsRepository.findUserChats(userId);
        return chats;
    }

    async getChatById(chatId:string){
        return await this.chatsRepository.findChatById(chatId);
    }
    async addUserChat(ownerId: string, createChatDto: CreateChatDto) {
        const chatOwner = (await this.profileService.getUserProfileById(
            ownerId,
        )) as UserProfile;
        if (!chatOwner)
            throw new NotFoundException('Owner user was not found!');
        const users = (await Promise.all(
            createChatDto.userIds.map(async (userId) => {
                return await this.profileService.getUserProfileById(userId);
            }),
        )) as UserProfile[];

        const chatInfo = {
            type: createChatDto.type,
            name: createChatDto.name,
            createdAt: createChatDto.createdAt,
        };

        const chatDto: Partial<Chat> = {
            ...chatInfo,
            chatOwner,
            messages: [] as Message[],
            users,
        };

        return await this.chatsRepository.createAndSaveChat(chatDto);
    }

    async updateUserChat(
        chatId: string,
        userId: string,
        updateChatDto: UpdateChatDto,
    ) {
        const user = await this.profileService.getUserProfileById(userId);
        if (!user) throw new NotFoundException('User does not exist');

        const chat = await this.chatsRepository.findChatById(chatId);

        if (userId !== chat.chatOwner.id)
            throw new ForbiddenException('You can not modify this chat!');

        const chatDto: Partial<Chat> = {
            id: chatId,
            ...updateChatDto,
        };

        const updatedChat = await this.chatsRepository.updateChat(chatDto);
        return updatedChat;
    }

    async deleteUserChat(chatId: string, userId: string) {
        //deleteChatDto:DeleteChatDto
        const chat = await this.chatsRepository.findChatById(chatId);

        if (chat.chatOwner.id !== userId)
            throw new ForbiddenException(
                'You do not have permissions to delete this chat!',
            );

        const result = await this.chatsRepository.deleteChat(chat);
        return result;
    }
}
