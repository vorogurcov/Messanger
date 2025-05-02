import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserAuth } from '../../user/credentials/entities/user-auth.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}
    @Get()
    async getGroups(@Req() req: Request) {
        const { id: userId } = req.user as UserAuth;

        const groups = await this.groupsService.getGroups(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'Get user groups successful!',
            groups,
        };
    }
    @Post()
    async createGroup(
        @Req() req: Request,
        @Body() createGroupDto: CreateGroupDto,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const group = await this.groupsService.createGroup(
                userId,
                createGroupDto,
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Create user group successful!',
                group,
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':groupId')
    async deleteGroup(@Param('groupId') groupId: string, @Req() req: Request) {
        const { id: userId } = req.user as UserAuth;
        try {
            const group = await this.groupsService.deleteGroup(userId, groupId);
            return {
                statusCode: HttpStatus.OK,
                message: 'Delete user group successful!',
                group,
            };
        } catch (error) {
            throw error;
        }
    }

    @Patch(':groupId')
    async updateGroup(
        @Param('groupId') groupId: string,
        @Req() req: Request,
        @Body() updateGroupDto: UpdateGroupDto,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const group = await this.groupsService.updateGroup(
                userId,
                groupId,
                updateGroupDto,
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Update user group successful!',
                group,
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':groupId/chats')
    async getChatsFromGroup(@Req() req: Request, @Param('groupId') groupId:string){
        const { id: userId } = req.user as UserAuth;
        try {
            console.log(groupId)
            const chats = await this.groupsService.getChatsFromGroup(userId, groupId)
            return {
                statusCode: HttpStatus.OK,
                message: 'Get group chats successful!',
                chats,
            };
        } catch (error) {
            throw error;
        }
    }
}
