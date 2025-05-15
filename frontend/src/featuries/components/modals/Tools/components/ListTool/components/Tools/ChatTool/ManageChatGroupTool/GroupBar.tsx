import { useGroupListContext } from "../../../../../../../../pages/Home/hooks/useGroupListContext";
import ListToolBase from "../../../../../ListToolBase/ListToolBase";
import HiddenBar, { IHiddenBar } from "../../../hiddenBarBase/HiddenBar";
import addFolder from "../../../../../../../../../../assets/img/folder.png"
import deleteFolder from "../../../../../../../../../../assets/img/filledFolder.png"
import { useGetChatContext } from "../../../../../../hooks/useGetChat";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../hooks/useStore";
import { ChatSliceManager } from "../../../../../../../../../entities/store/featuries/chatSlice";
import { allChats } from "../../../../../../../../../entities/schemes/enums/chatEnum";
import { checkAndDeleteGroup } from "../../utils";
import ApiQuery from "../../../../../../../../../api/query";
import CreateGroupTool from "./CreateGroupTool";
import { IGroups } from "../../../../../../../../../entities/schemes/dto/Chat";


export default function GroupBar({refLeftEl, isOpen, ...props}: IHiddenBar){
    const groups = useGroupListContext()
    const thisChat = useGetChatContext()
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats) 
    const dispatch = useAppDispatch()

    const handleDelete = useCallback(async (group: IGroups) => { // обработать как-то удаление
        // если не allChats то надо удалить из списка
        if (groups?.groups.find(gr => gr.active)?.id !== allChats){
            dispatch(ChatSliceManager.redusers.update( // удаляем из списка чатов группы
                chats.filter(
                    chat => chat.id !== thisChat?.chat.id
                )
            ))
        } else if (thisChat){ // не удаляем в allChats
            dispatch(ChatSliceManager.redusers.update(
                chats.map(
                    chat => chat.id === thisChat.chat.id ? {...chat, group: chat.group.filter(gr => gr.id !== group.id)} : chat
                )
            ))
        }
        thisChat && await ApiQuery.deleteChatFromGroup(thisChat.chat.id, group.id)
        await checkAndDeleteGroup(group.id, chats, groups) // если в группе 0 чатов осталось, то удаляем
    }, [thisChat, groups, chats, dispatch])

    const handleAdd = useCallback(async (group: IGroups) => { // обработать как-то удаление
        if (thisChat){
            dispatch(ChatSliceManager.redusers.update(
                chats.map(
                    chat => chat.id === thisChat.chat.id ? {...chat, group: [...chat.group, group]} : chat
                )
            ))
        }
        ApiQuery.updateGroup(group.id, undefined, thisChat?.chat.id ? [thisChat.chat.id] : [])
    }, [thisChat, chats, dispatch])

    return(
        <HiddenBar
            refLeftEl={refLeftEl}
            isOpen={isOpen}
            onMouseLeave={props.onMouseLeave}
            onMouseEnter={props.onMouseEnter}
        >
            {groups?.groups.map(gr => gr.name !== allChats && 
                <ListToolBase 
                    srcImg={thisChat?.chat.group.find(group => gr.id === group.id) ? deleteFolder : addFolder}
                    label={gr.name}
                    onClick={() => thisChat?.chat.group.find(group => group.id === gr.id) ? handleDelete(gr) : handleAdd(gr)}
                />
            )}
            {thisChat && <CreateGroupTool handleClose={thisChat.handleClose} chatId={thisChat.chat.id}/>}
        </HiddenBar>
    )
}