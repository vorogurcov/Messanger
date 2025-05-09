import { ChatList } from "../../../entities/schemes/dto/Chat";

export interface IAddChatProps extends ChatList{
    selected: boolean
}