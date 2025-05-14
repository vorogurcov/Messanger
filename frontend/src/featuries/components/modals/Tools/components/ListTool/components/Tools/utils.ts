import { ChatList } from "../../../../../../../entities/schemes/dto/Chat";
import { allChats } from "../../../../../../../entities/schemes/enums/chatEnum";
import { IGroupListContext } from "../../../../../../pages/Home/hooks/useGroupListContext";
import { IChatContext } from "../../../../hooks/useGetChat";

export async function checkAndDeleteGroup(thisChat: IChatContext | null, chats: ChatList[], groups: IGroupListContext | null){
    if (thisChat && !chats.find(
        chat => chat.group === thisChat.chat.group && chat.id !== thisChat.chat.id
    ) && groups?.groups.find(gr => gr.active)?.name !== allChats)
    {
        await groups?.handleDelete(thisChat.chat.group)
    }
}