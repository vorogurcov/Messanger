import { createContext, useContext } from "react";
import { ChatList } from "../../../../entities/schemes/dto/Chat";

export interface IGroupList{
    active: boolean
    name: string
}

export interface IChatContext{
    chat: ChatList, setChat: React.SetStateAction<ChatList>, groupList: IGroupList[]
}
export const ChatContext = createContext<IChatContext | null>(null)
export const useGetChatContext = () => useContext(ChatContext)