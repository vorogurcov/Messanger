import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    UseGuards,
    Body,
    Req,
    Param,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
import { UserAuth } from '../../user/credentials/entities/user-auth.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('chats/:chatId/messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}
    @Get()
    async getChatMessages(
        @Req() req: Request,
        @Param('chatId') chatId: string,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const chatMessages = await this.messagesService.getChatMessages(
                userId,
                chatId,
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Get chat messages successful!',
                chatMessages,
            };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async createChatMessage(
        @Req() req: Request,
        @Param('chatId') chatId: string,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const chatMessage = await this.messagesService.createChatMessage(
                userId,
                chatId,
                createMessageDto
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Get chat messages successful!',
                chatMessage,
            };
        } catch (error) {
            throw error;
        }

    }

    @Patch(':messageId')
    async updateChatMessage(
        @Req() req: Request,
        @Param('chatId') chatId: string,
        @Param('messageId') messageId: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const chatMessage = await this.messagesService.updateChatMessage(
                userId,
                chatId,
                messageId,
                updateMessageDto
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Get chat messages successful!',
                chatMessage,
            };
        } catch (error) {
            throw error;
        }

    }

    @Delete(':messageId')
    async deleteChatMessage(
        @Req() req: Request,
        @Param('chatId') chatId: string,
        @Param('messageId') messageId: string,
    ) {
        const { id: userId } = req.user as UserAuth;
        try {
            const chatMessage = await this.messagesService.deleteChatMessage(
                userId,
                chatId,
                messageId
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'Get chat messages successful!',
                chatMessage,
            };
        } catch (error) {
            throw error;
        }

    }
}
