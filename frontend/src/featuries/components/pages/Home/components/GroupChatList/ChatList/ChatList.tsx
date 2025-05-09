import { useCallback } from "react"
import ChatOnPanel from "./components/ChatOnPanel/ChatOnPanel"
import css from "./css.module.scss"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore"

export default function ChatList(){ 
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const dispatch = useAppDispatch()

    const handleClick = useCallback((id: string) => {
        const newChats = chats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        dispatch(ChatSliceManager.redusers.update(newChats))
    }, [chats, dispatch])

    return(
        <div className={css.wrapper}>
            {chats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClick}/>)}
        </div>
    )
}