import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGroup } from '../entities/chat-group.entity';
import { UserProfile } from '../../../user/profile/entities/user-profile.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Injectable()
export class ChatGroupsRepository {
    constructor(
        @InjectRepository(ChatGroup) private repository: Repository<ChatGroup>,
    ) {}

    async findUserGroups(userId: string) {
        return await this.repository.find({
            relations: {
                groupOwner: true,
            },
            select: {
                id: true,
                name: true,
            },
            where: {
                groupOwner: {
                    id: userId,
                },
            },
        });
    }

    async deleteUserGroupById(groupId:string){
        await this.repository.delete({
            id:groupId,
        })
    }

    async getChatsFromGroup(userId: string, groupId: string): Promise<Chat[]> {
        const chatGroup = await this.repository
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.chats', 'chats')
            .leftJoinAndSelect('group.groupOwner', 'owner')
            .where('group.id = :groupId', { groupId })
            .andWhere('owner.id = :userId', { userId })
            .getOne();

        if (!chatGroup) {
            throw new NotFoundException('Such group was not found!');
        }

        return chatGroup.chats;
    }

    async updateUserGroupById(
        name: string,
        chats: Chat[],
        groupId: string,
        userId: string,
    ) {
        const group = await this.findOneGroupById(groupId, userId);
        if (!group) throw new NotFoundException('Such group does not exist!');
        console.log(name)
        if (name) group.name = name;
        if (chats.length !== 0) group.chats = group.chats.concat(chats);
        console.log('Update user group',group)
        return await this.repository.save(group);
    }

    async deleteChatFromGroup(
        userId: string,
        groupId: string,
        deleteChat: Chat,
    ) {
        const group = await this.findOneGroupById(groupId, userId);
        if (!group) throw new NotFoundException('Such group does not exist!');
        group.chats = group.chats.filter((chat) => {
            return chat.id !== deleteChat.id;
        });

        return await this.repository.save(group);
    }
    async findOneGroupById(groupId: string, userId: string) {
        return await this.repository.findOne({
            relations: {
                groupOwner: true,
                chats: true,
            },
            where: {
                id: groupId,
                groupOwner: {
                    id: userId,
                },
            },
        });
    }

    async deleteUserGroup(userId: string, groupId: string) {
        const group = await this.findOneGroupById(groupId, userId);
        if (!group) throw new NotFoundException('Such group does not exist!');
        await this.deleteUserGroupById(groupId);
        return group;
    }

    async createUserGroup(
        name: string,
        groupOwner: UserProfile,
        chats: Chat[],
    ) {
        const newUserGroup = await this.repository.create({
            name,
            groupOwner,
            chats,
        });

        return await this.repository.save(newUserGroup);
    }
}
