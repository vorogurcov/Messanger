import { ChatList } from "../dto/Chat";

export interface ChatListAdaptedProps extends ChatList{
    active: boolean
    numberNewMessage: number
}