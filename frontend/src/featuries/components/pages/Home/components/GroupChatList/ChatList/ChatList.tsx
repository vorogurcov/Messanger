import { useCallback, useEffect, useState } from "react"
import ChatOnPanel from "./components/ChatOnPanel/ChatOnPanel"
import css from "./css.module.scss"
import { ChatType } from "../../../../../../entities/schemes/enums/chatEnum"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore"

export default function ChatList({group, typeChat}: {group: string, typeChat: ChatType}){ // скорее всего тут надо будет фетчить по group и typechat
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const dispatch = useAppDispatch()
    const [localChats, setLocalChats] = useState(chats)

    useEffect(() => {
        setLocalChats(chats)
    }, [chats])

    const handleClick = useCallback((id: number) => {
        const newChats = localChats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        setLocalChats(newChats)
    }, [localChats])

    return(
        <div className={css.wrapper}>
            {localChats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClick}/>)}
        </div>
    )
}