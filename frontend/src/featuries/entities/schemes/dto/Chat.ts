import { ChatType } from "../enums/chatEnum"

export interface PanelButtons{
    id: number
    name: string
    active: boolean
}

export interface ChatList{
    id: number
    userName: string
    lastMessage?: string
    numberNewMessage: number
    avatar?: string
    group: string
    typeChat: ChatType
}