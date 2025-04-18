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


export default function GroupBar({refLeftEl, isOpen, ...props}: IHiddenBar){
    const groups = useGroupListContext()
    const thisChat = useGetChatContext()
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats) 
    const dispatch = useAppDispatch()

    const handleClick = useCallback((groupName: string) => {
        if (thisChat?.chat.group !== allChats && groups?.groups.find(gr => gr.active)?.name !== allChats){
            checkAndDeleteGroup(thisChat, chats, groups)
            .then(() => {
                dispatch(ChatSliceManager.redusers.update(
                    chats.filter(
                        chat => chat.group === thisChat?.chat.group && chat.id !== thisChat.chat.id
                    )
                ))
            })
        } else if (thisChat){
            dispatch(ChatSliceManager.redusers.update(
                chats.map(
                    chat => chat.id === thisChat.chat.id ? {...chat, group: groupName} : chat
                )
            ))
        }
        // тут надо api
    }, [thisChat, groups, chats, dispatch])

    return(
        <HiddenBar
            refLeftEl={refLeftEl}
            isOpen={isOpen}
            onMouseLeave={props.onMouseLeave}
            onMouseEnter={props.onMouseEnter}
        >
            {groups?.groups.map(gr => gr.name !== allChats && 
                <ListToolBase 
                    srcImg={thisChat?.chat.group === gr.name ? deleteFolder : addFolder}
                    label={gr.name}
                    onClick={() => handleClick(thisChat?.chat.group === gr.name ? allChats : gr.name)}
                />
            )}
        </HiddenBar>
    )
}