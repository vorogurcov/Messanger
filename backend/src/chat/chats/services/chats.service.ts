import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { ChatsRepository } from '../repositories/chats.repository';
import { Chat } from '../entities/chat.entity';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';
import { ProfileService } from '../../../user/profile/profile.service';
import { Message } from '../../messages/entities/message.entity';
import {CentrifugoService} from "../../../common/centrifugo/centrifugo.service";

@Injectable()
export class ChatsService {
    constructor(
        private chatsRepository: ChatsRepository,
        private profileService: ProfileService,
        private centrifugoService: CentrifugoService,
    ) {}
    async getUserChats(userId: string) {
        const chats = await this.chatsRepository.findUserChats(userId);
        return chats;
    }

    async getChatById(chatId: string) {
        return await this.chatsRepository.findChatById(chatId);
    }

    async getChatMessages(userId: string, chatId: string) {
        return await this.chatsRepository.getChatMessages(userId, chatId);
    }

    async addUserChat(ownerId: string, createChatDto: CreateChatDto) {
        const chatOwner = (await this.profileService.getUserProfileById(
            ownerId,
        )) as UserProfile;
        if (!chatOwner)
            throw new NotFoundException('Owner user was not found!');
        createChatDto.userIds.push(chatOwner.id);
        const users = (await Promise.all(
            createChatDto.userIds.map(async (userId) => {
                return await this.profileService.getUserProfileById(userId);
            }),
        )) as UserProfile[];
        const chatInfo = {
            type: createChatDto.type,
            name: createChatDto.name,
            createdAt: createChatDto.createdAt,
            lastMessage: null as unknown as Message,
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

        if (!chat) throw new NotFoundException('Chat does not exist');

        if (userId !== chat.chatOwner.id)
            throw new ForbiddenException('You can not modify this chat!');

        const existingUserIds = chat.users.map((u) => u.id);
        const newUserIds = updateChatDto.userIds ?? [];

        const uniqueUserIds = Array.from(
            new Set([...existingUserIds, ...newUserIds]),
        );

        const users: UserProfile[] = [];

        for (const id of uniqueUserIds) {
            const user = await this.profileService.getUserProfileById(id);
            if (!user) {
                throw new NotFoundException(
                    `User with id ${id} does not exist`,
                );
            }
            users.push(user);
        }

        if (users.length !== uniqueUserIds.length) {
            throw new NotFoundException('One or more users do not exist');
        }

        chat.name = updateChatDto.name ?? chat.name;
        chat.users = users;

        const updatedChat = await this.chatsRepository.updateChat(chat);
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

    async updateLastMessage(chatId: string, message: Message) {
        const chatInfo = await this.chatsRepository.findChatById(chatId);
        chatInfo.lastMessage = message;
        const chat = await this.chatsRepository.updateChat(chatInfo);
        const users = chatInfo.users;

        users.forEach((user)=>{
            const userId = user.id;
            const userChannel = `#${userId}`;
            this.centrifugoService.centrifugoClient.publish({
                channel:userChannel,
                data:{
                    lastMessageChange:{
                        chatId,
                        lastMessage: message,
                    }
                }
            })
        })

        return chat
    }

    async deleteUserFromChat(
        chatId: string,
        userId: string,
        deleteUserId: string,
    ) {
        const chat = await this.chatsRepository.findChatById(chatId);

        if (chat.chatOwner.id !== userId)
            throw new ForbiddenException(
                'You do not have permissions to delete users from this chat!',
            );
        chat.users = chat.users.filter((user) => user.id !== deleteUserId);
        return await this.chatsRepository.updateChat(chat);
    }
}
