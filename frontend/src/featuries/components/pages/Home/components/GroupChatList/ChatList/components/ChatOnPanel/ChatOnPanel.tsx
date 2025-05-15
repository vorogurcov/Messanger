import { memo } from "react";
import Avatar from "../../../../../../../components/Avatar/Avatar";
import BaseAvatar from "../../../../../../../components/BaseAvatar/BaseAvatar";
import { ChatListAdaptedProps } from "../../../../../../../../entities/schemes/client/chat";
import css from "./css.module.scss"
import ChatToolModal from "../../../../../../../modals/Tools/ChatToolModal";
import { useGroupListContext } from "../../../../../hooks/useGroupListContext";
import useContextMenu from "../../../../../hooks/useContextMenu";

function NumberNewMessages({numberMessages}: {numberMessages: number}){
    return(
        <div className={css.wrapperNewMess}>
            {numberMessages > 0 && <div className={css.newMess}>
                {numberMessages}
            </div>}
        </div>
    )
}

function AvatarChat({url}: {url?: string}){
    return(
        <div className={css.wrapperAvatar}>
            {url ? <Avatar src={url}/> : <BaseAvatar/> }
        </div>
    )
}

function TextInfo({userName, lastMessage, active}: {userName: string, lastMessage?: string, active: boolean}){
    return(
        <div className={css.wrapperText}>
            <div>
                <b>{userName}</b>
            </div>
            <div className={css.lastMes} style={{color: active ? "white" : ""}}>
                {lastMessage}
            </div>
        </div>
    )
}

interface Props extends ChatListAdaptedProps{
    callback: (id: string) => void
}

const ChatOnPanel = memo(({...chatData}: Props) => {
    const groupsData = useGroupListContext()
    const {handleContextMenu, showTools, setShowTools, coordinates} = useContextMenu()
    return(
        <>
        <div 
            className={css.wrapperChat} 
            style={{backgroundColor: chatData.active ? "#006FFD" : "", color: chatData.active ? "white" : ""}} 
            onClick={() => chatData.callback(chatData.id)}
            onContextMenu={handleContextMenu}
        >
            <AvatarChat url={chatData.avatar}/>
            <TextInfo userName={chatData.name} lastMessage={chatData.lastMessage?.context} active={chatData.active}/>
            <NumberNewMessages numberMessages={chatData.numberNewMessage}/>
        </div>
        <ChatToolModal 
            chat={chatData} 
            isOpen={showTools} 
            setIsOpen={setShowTools} 
            groupList={groupsData?.groups ?? []}
            coordinates={coordinates}
        />
        </>
    )
})

export default ChatOnPanel