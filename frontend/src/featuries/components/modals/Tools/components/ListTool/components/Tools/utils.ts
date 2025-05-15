import { ChatList } from "../../../../../../../entities/schemes/dto/Chat";
import { allChats } from "../../../../../../../entities/schemes/enums/chatEnum";
import { IGroupListContext } from "../../../../../../pages/Home/hooks/useGroupListContext";

export async function checkAndDeleteGroup(deletingGroupId: string, chats: ChatList[], groups: IGroupListContext | null){
    if (deletingGroupId !== allChats && chats.filter(chat => chat.group.find(gr => gr.id === deletingGroupId)).length === 1) 
    // === 1 т к сейчас для чата удаляется, но еще не было диспатча с обновленными чатами
    {
        await groups?.handleDelete(deletingGroupId)
    }
}