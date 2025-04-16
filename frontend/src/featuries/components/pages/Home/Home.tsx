import { useEffect, useState } from "react";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { allChats, ChatType } from "../../../entities/schemes/enums/chatEnum";
import ChatButton from "./components/buttons/chat";
import FolderButton from "./components/buttons/folder";
import ChatPanel from "./components/GroupChatList/ChatPanel";
import Chat from "./components/Chat/chat";
import useGroups from "./hooks/useGroups";
import { GroupListContext } from "./hooks/useGroupListContext";
import { ChatSliceManager } from "../../../entities/store/featuries/chatSlice";
import { useAppDispatch } from "../../../../hooks/useStore";

export default function Home(){ // можно в локал сторадж еще сохранять выбраную группу и тип чата
    const [typeChat, setTypeChat] = useState<ChatType>(ChatType.chats)
    const {groupsState, handleClick, handleAddGroup, handleDelete} = useGroups(typeChat)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(ChatSliceManager.fetching.getData({typeChat: typeChat, group: groupsState.find(gr => gr.active)?.name ?? allChats}))
    }, [typeChat, groupsState, dispatch])
    return(
        <MainWrapper 
            style={{display: "flex", fontSize: "80%"}}
            buttons={
                groupsState.map(
                    but => but.name === allChats ?
                    <ChatButton {...but} onClick={() => handleClick(but.name)}/>
                    : <FolderButton {...but} onClick={() => handleClick(but.name)}/>
                )
            }
        >
            <GroupListContext.Provider value={{handleAdd: handleAddGroup, handleDelete: handleDelete, groups: groupsState}}>
                <ChatPanel group={groupsState.find(group => group.active)?.name ?? "Все чаты"} typeChat={typeChat} setTypeChat={setTypeChat}/>
                <Chat/>
            </GroupListContext.Provider>
        </MainWrapper>
    )
}