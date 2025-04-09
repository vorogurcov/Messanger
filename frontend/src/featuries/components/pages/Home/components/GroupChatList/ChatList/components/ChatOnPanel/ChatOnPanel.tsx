import Avatar from "../../../../../../../components/Avatar/Avatar";
import BaseAvatar from "../../../../../../../components/BaseAvatar/BaseAvatar";
import { ChatListAdaptedProps } from "../../types";
import css from "./css.module.scss"

function NumberNevMessages({numberMessages}: {numberMessages: number}){
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
    callback: (id: number) => void
}

export default function ChatOnPanel({...chatData}: Props){
    return(
        <div 
            className={css.wrapperChat} 
            style={{backgroundColor: chatData.active ? "#006FFD" : "", color: chatData.active ? "white" : ""}} 
            onClick={() => chatData.callback(chatData.id)}
        >
            <AvatarChat url={chatData.avatar}/>
            <TextInfo userName={chatData.userName} lastMessage={chatData.lastMessage} active={chatData.active}/>
            <NumberNevMessages numberMessages={chatData.numberNewMessage}/>
        </div>
    )
}