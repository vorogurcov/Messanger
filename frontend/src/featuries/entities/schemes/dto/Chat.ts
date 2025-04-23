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

export interface ChatList{
    id: number
    userName: string
    lastMessage?: string
    numberNewMessage: number
    avatar?: string
    group: string
    typeChat: ChatType
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