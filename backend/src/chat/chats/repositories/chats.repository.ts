import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Chat} from "../entities/chat.entity";


@Injectable()
export class ChatsRepository {
    // DAL - Data Access Layer
    constructor(
        @InjectRepository(Chat)
        private repository:Repository<Chat>
    ) {}

    async findChatById(chatId:string){
        const chat = await this.repository.findOneBy(
            {
                id:chatId
            }
            )
        if (!chat)
            throw new NotFoundException('Chat was not found!')
        return chat
    }

    async findUserChats(userId:string): Promise<Chat[]>{
        const chats = await this.repository.find({
            select:{
                id:true,
                type:true,
                name:true,
                createdAt:true,
                users:{
                    userName:true,
                    avatarUrl:true,
                }
            },
            relations: {
                users:true,
            },
            where:{
                users:{
                    id:userId,
                }
            }
        })
        return chats;
    }

    async createAndSaveChat(chatDto:Partial<Chat>){
        const chat = this.repository.create(chatDto)
        const newChat = await this.repository.save(chat)
        return newChat
    }

    async updateChat(chatDto:Partial<Chat>){
        const updatedChat = await this.repository.save(chatDto)
        return updatedChat
    }

    async deleteChat(chat:Chat){
        return await this.repository.remove(chat)
    }
}