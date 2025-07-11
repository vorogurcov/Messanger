import { HTMLAttributes, useCallback } from "react";
import ListToolBase from "../../../../ListToolBase/ListToolBase";
import { useGetChatContext } from "../../../../../hooks/useGetChat";
import ApiQuery from "../../../../../../../../api/query";
import imageDel from "../../../../../../../../../assets/img/redDelete.png"
import { useAppDispatch, useAppSelector } from "../../../../../../../../../hooks/useStore";
import { ChatSliceManager } from "../../../../../../../../entities/store/featuries/chatSlice";
import { checkAndDeleteGroup } from "../utils";
import { useGroupListContext } from "../../../../../../../pages/Home/hooks/useGroupListContext";

export function DeleteTool({onClick, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <ListToolBase srcImg={imageDel} label="Удалить" {...props} onClick={onClick}/>
    )
}

export default function DeleteChatTool({...props}: HTMLAttributes<HTMLDivElement>){
    const chatManager = useGetChatContext()
    const allChats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const groups = useGroupListContext()
    const dispatch = useAppDispatch()

    const handleDelete = useCallback(() => {
        if (chatManager){
            ApiQuery.deleteChat(chatManager.chat.id) // мб вынеси в слайс
            .then(() => {
                dispatch(ChatSliceManager.redusers.update(allChats.filter(chat => chat.id !== chatManager.chat.id)))
            })
            chatManager.chat.group.forEach(gr => checkAndDeleteGroup(gr.id, chats, groups))
        }
    }, [chatManager, allChats, dispatch, chats, groups])

    return(
        <DeleteTool {...props} onClick={handleDelete}/>
    )
}