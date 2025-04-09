import { useEffect, useState } from "react";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { ChatType } from "../../../entities/schemes/enums/chatEnum";
import { useNavigateButtonsReduser } from "../../../../hooks/useReducer/useNavigateButtosReduser";
import ApiQuery from "../../../api/query";
import ChatButton from "./components/buttons/chat";
import FolderButton from "./components/buttons/folder";
import ChatPanel from "./components/GroupChatList/chatlist";
import Chat from "./components/Chat/chat";

export default function Home(){
    const [typeChat, setTypeChat] = useState<ChatType>(ChatType.chats)
    const [groupsState, disputchButtonsState] = useNavigateButtonsReduser()

    const handleClick = (id: number) => disputchButtonsState({type: "CHOOSE", id: id})

    useEffect(() => {
        ApiQuery.getChatGroups(typeChat).then((data) => {disputchButtonsState({type: "RESET_FORM"} ); disputchButtonsState({type: "ADD_FIELDS", value: data} )})

    }, [typeChat])
    return(
        <MainWrapper 
            style={{display: "flex", fontSize: "80%"}}
            buttons={
                groupsState.map(
                    but => but.id === -1 ?
                    <ChatButton {...but} onClick={() => handleClick(but.id)}/>
                    : <FolderButton {...but} onClick={() => handleClick(but.id)}/>
                )
            }
        >
            <ChatPanel group={groupsState.find(group => group.active)?.name ?? "Все чаты"} typeChat={typeChat} setTypeChat={setTypeChat}/>
            <Chat/>
        </MainWrapper>
    )
}