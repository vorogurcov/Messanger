import { useCallback, useEffect, useState } from "react"
import ChatOnPanel from "./components/ChatOnPanel/ChatOnPanel"
import css from "./css.module.scss"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import { useAppSelector } from "../../../../../../../hooks/useStore"

export default function ChatList(){ 
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const [localChats, setLocalChats] = useState(chats)

    useEffect(() => {
        setLocalChats(chats)
    }, [chats])

    const handleClick = useCallback((id: string) => {
        const newChats = localChats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        setLocalChats(newChats)
    }, [localChats])

    return(
        <div className={css.wrapper}>
            {localChats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClick}/>)}
        </div>
    )
}