import { useCallback, useEffect, useState } from "react"
import { ChatListAdaptedProps } from "./types"
import ApiQuery from "../../../../../../api/query"
import ChatOnPanel from "./components/ChatOnPanel/ChatOnPanel"
import css from "./css.module.scss"
import { ChatType } from "../../../../../../entities/schemes/enums/chatEnum"

export default function ChatList({group, typeChat}: {group: string, typeChat: ChatType}){
    const [chats, setChats] = useState<ChatListAdaptedProps[]>([])

    useEffect(() => { // из-за вызова useEff дважды дубликаты
        ApiQuery.getChatLists(group, typeChat)
        .then((list) => setChats(list.map(el => {return {...el, active: false}})))
    }, [group, typeChat])

    const handleClick = useCallback((id: number) => {
        const newChats = chats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        setChats(newChats)
    }, [chats])

    return(
        <div className={css.wrapper}>
            {chats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClick}/>)}
        </div>
    )
}