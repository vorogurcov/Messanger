import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';

@Injectable()
export class MessagesRepository {
    constructor(
        @InjectRepository(Message) private repository: Repository<Message>,
    ) {}

    async saveMessageToChat(
        createMessageDto: CreateMessageDto,
        userId: string,
        chatId: string,
    ) {
        const newMessage = await this.repository.create({
            ...createMessageDto,
            chatId,
            senderId: userId,
            createdAt: new Date().toISOString(),
        });

        return await this.repository.save(newMessage);
    }

    async updateChatMessage(
        updateMessageDto: UpdateMessageDto,
        userId: string,
        chatId: string,
        messageId: string,
    ) {
        const message = await this.repository.findOneBy({ id: messageId });

        if (!message) throw new NotFoundException('Message not found!');

        if (message.senderId !== userId)
            throw new ForbiddenException('You can not update this message');

        const newMessage = await this.repository.create({
            ...updateMessageDto,
            chatId,
            senderId: userId,
        });

        const result = await this.repository.update(
            {
                id: messageId,
            },
            newMessage,
        );

        return newMessage;
    }

    async deleteChatMessage(message: Message) {
        await this.repository.delete(message);

        return message;
    }

    async findMessageById(messageId: string) {
        return await this.repository.findOneBy({ id: messageId });
    }
}
