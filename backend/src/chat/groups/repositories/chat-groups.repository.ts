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

    async getChatsFromGroup(userId: string, groupId: string): Promise<Chat[]> {
        const chatGroup = await this.repository
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.chats','chats')
            .leftJoinAndSelect('group.groupOwner','owner')
            .where('group.id = :groupId',{groupId} )
            .andWhere('owner.id = :userId',{userId})
            .getOne()

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

        group.name = name;
        group.chats = chats;

        return await this.repository.save(group);
    }

    async findOneGroupById(groupId: string, userId: string) {
        return await this.repository.findOne({
            relations: {
                groupOwner: true,
            },
            where: {
                id: groupId,
                groupOwner: {
                    id: userId,
                },
            },
        });
    }

    async deleteUserGroupById(userId: string, groupId: string) {
        const group = await this.findOneGroupById(groupId, userId);
        if (!group) throw new NotFoundException('Such group does not exist!');
        await this.repository.delete(group);
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
