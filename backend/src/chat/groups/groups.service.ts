import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatGroupsRepository } from './repositories/chat-groups.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { ChatsService } from '../chats/services/chats.service';
import { ProfileService } from '../../user/profile/profile.service';
import { Chat } from '../chats/entities/chat.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
    constructor(
        private chatGroupsRepository: ChatGroupsRepository,
        private chatsService: ChatsService,
        private profileService: ProfileService,
    ) {}
    async getGroups(userId: string) {
        return await this.chatGroupsRepository.findUserGroups(userId);
    }

    async createGroup(userId: string, createGroupDto: CreateGroupDto) {
        const { name, chatIds } = createGroupDto;

        const groupOwner = await this.profileService.getUserProfileById(userId);
        if (!groupOwner) throw new NotFoundException('User does not exist!');

        let chats: Chat[] = [];

        if (chatIds.length > 0) {
            const results = await Promise.allSettled(
                chatIds.map((id) => this.chatsService.getChatById(id)),
            );

            const rejected = results.filter((r) => r.status === 'rejected');
            if (rejected.length > 0) {
                throw new NotFoundException(
                    'One or more chats were not found.',
                );
            }

            chats = (results as PromiseFulfilledResult<Chat>[]).map(
                (r) => r.value,
            );
        }

        return await this.chatGroupsRepository.createUserGroup(
            name,
            groupOwner,
            chats,
        );
    }

    async deleteGroup(userId: string, groupId: string) {
        return await this.chatGroupsRepository.deleteUserGroupById(
            userId,
            groupId,
        );
    }

    async updateGroup(
        userId: string,
        groupId: string,
        updateGroupDto: UpdateGroupDto,
    ) {
        const { name, newChatIds } = updateGroupDto;

        let chats: Chat[] = [];

        if (newChatIds.length > 0) {
            const results = await Promise.allSettled(
                newChatIds.map((id) => this.chatsService.getChatById(id)),
            );

            const rejected = results.filter((r) => r.status === 'rejected');
            if (rejected.length > 0) {
                throw new NotFoundException(
                    'One or more chats were not found.',
                );
            }

            chats = (results as PromiseFulfilledResult<Chat>[]).map(
                (r) => r.value,
            );
        }

        return await this.chatGroupsRepository.updateUserGroupById(
            name,
            chats,
            groupId,
            userId,
        );
    }

    async getChatsFromGroup(userId: string, groupId: string) {
        return await this.chatGroupsRepository.getChatsFromGroup(
            userId,
            groupId,
        );
    }

    async deleteChatFromGroup(
        userId: string,
        groupId: string,
        deleteChatId: string,
    ) {
        const deleteChat = await this.chatsService.getChatById(deleteChatId);

        return await this.chatGroupsRepository.deleteChatFromGroup(
            userId,
            groupId,
            deleteChat,
        );
    }
}
