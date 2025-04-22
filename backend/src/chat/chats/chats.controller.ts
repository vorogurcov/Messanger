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
import { ChatsService } from './services/chats.service';
import { Request } from 'express';
import { UserAuth } from '../../user/credentials/entities/user-auth.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('chats')
export class ChatsController {
    constructor(private chatsService: ChatsService) {}
    @Get()
    async getUserChats(@Req() req: Request) {
        const { id } = req.user as UserAuth;
        const chats = await this.chatsService.getUserChats(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Get user chats successful',
            chats,
        };
    }
    @Post()
    async addUserChat(
        @Req() req: Request,
        @Body() createChatDto: CreateChatDto,
    ) {
        const { id } = req.user as UserAuth;
        try {
            const chat = await this.chatsService.addUserChat(id, createChatDto);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Add user chat successful!',
                chat,
            };
        } catch (error) {
            throw error;
        }
    }

    @Patch(':chatId')
    async updateUserChat(
        @Param('chatId') chatId: string,
        @Req() req: Request,
        @Body() updateChatDto: UpdateChatDto,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const chat = await this.chatsService.updateUserChat(
                chatId,
                userId,
                updateChatDto,
            );
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Update user chat successful',
                chat,
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':chatId')
    async deleteUserChat(@Param('chatId') chatId: string, @Req() req: Request) {
        // , @Body() deleteChatDto:DeleteChatDto
        const { id: userId } = req.user as UserAuth;
        try {
            const chat = await this.chatsService.deleteUserChat(chatId, userId);
            return {
                statusCode: HttpStatus.OK,
                message: 'Delete user chat successful!',
                chat,
            };
        } catch (error) {
            throw error;
        }
    }
}
