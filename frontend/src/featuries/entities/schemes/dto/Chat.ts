import { ChatType } from "../enums/chatEnum"

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

export interface ChatList{
    id: string
    name: string
    lastMessage?: MessagesDTO
    avatar?: string
    group: string
    type: ChatType
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