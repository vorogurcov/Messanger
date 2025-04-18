import { useState } from "react";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { ChatType } from "../../../entities/schemes/enums/chatEnum";
import ChatPanel from "./components/GroupChatList/ChatPanel";
import Chat from "./components/Chat/chat";
import useGroups from "./hooks/useGroups";
import { GroupListContext } from "./hooks/useGroupListContext";

export default function Home(){ // можно в локал сторадж еще сохранять выбраную группу и тип чата
    const [typeChat, setTypeChat] = useState<ChatType>(ChatType.chats)
    const groupsManager = useGroups(typeChat)
    return(
        <GroupListContext.Provider value={groupsManager}>
            <MainWrapper 
                style={{display: "flex", fontSize: "80%"}}
                buttons={groupsManager.groups}
            >
                    <ChatPanel 
                        group={groupsManager.groups.find(group => group.active)?.name ?? "Все чаты"}
                        typeChat={typeChat} 
                        setTypeChat={setTypeChat}
                    />
                    <Chat/>
            </MainWrapper>
        </GroupListContext.Provider>

    )
}