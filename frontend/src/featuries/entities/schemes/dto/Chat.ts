import { ChatType } from "../enums/chatEnum"
import { UserLK } from "./User"

export interface PanelGroupButtons{
    id: string
    name: string
    active: boolean
    isChangeName: boolean
}

export const initialPanelGroupButtons: PanelGroupButtons = {
    id: "",
    name: "",
    active: false,
    isChangeName: false
}

export interface MessagesDTO{
    id: string,
    context: string,
    senderId: string,
    createdAt: string
}

interface ChatBaseDTO{
    name: string
    type: ChatType
}

export interface ChatList extends ChatBaseDTO{
    id: string
    lastMessage?: MessagesDTO
    avatar?: string
    group: string
    users: UserLK[]
}

export interface CreateChatDTO extends ChatBaseDTO{
    createdAt: Date
    userIds: string[]
}

export interface ICreateGroup{
    name: string
    createdAt: string
    chatIds: number[]
}

export const initialCreateGroup: ICreateGroup = {
    name: "",
    createdAt: '2025-04-02',
    chatIds: []
}