import { createContext, useContext } from "react";
import { ChatList, PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";

export interface IChatContext{
    chat: ChatList, 
    setChat: React.SetStateAction<ChatList>, 
    groupList: PanelGroupButtons[],
    handleClose: () => void
}
export const ChatContext = createContext<IChatContext | null>(null)
export const useGetChatContext = () => useContext(ChatContext)