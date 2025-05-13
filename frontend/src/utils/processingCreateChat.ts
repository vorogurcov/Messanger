import { CreateChatDTO } from "../featuries/entities/schemes/dto/Chat";
import { ChatType } from "../featuries/entities/schemes/enums/chatEnum";

export default function processingCreateChat(chatName: string, type: ChatType, userIds: string[]): CreateChatDTO{
    const createdAt = new Date()
    return {
        name: chatName,
        type,
        createdAt,
        userIds
    }
}

export function createNameChat(firstUser: string, secondUser: string){
    return `Chat ${firstUser}&${secondUser}`
}