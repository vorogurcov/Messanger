import {useCallback, useEffect} from "react"
import ChatOnPanel from "./components/ChatOnPanel/ChatOnPanel"
import css from "./css.module.scss"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore"
import centrifuge from "../../../../../../entities/centrifugo/centrifugo";

export default function ChatList(){ 
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats) // наверное будут серчед и просто, у серчед будет свой хендлклик
    const searchedChats = useAppSelector(ChatSliceManager.selectors.selectSearched)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const sub = centrifuge.on("publication", (ctx) => {
            const event = ctx.data.lastMessageChange;
            if (!event) return;

            dispatch(ChatSliceManager.redusers.updateChatLastMessage({
                chatId: event.chatId,
                lastMessage: event.lastMessage
            }));
        });

    }, []);



    const reset = useCallback(() => { // не должно быть активных серчей и основных
        dispatch(ChatSliceManager.redusers.update(chats.map(chat => {return {...chat, active: false}})))
        dispatch(ChatSliceManager.redusers.updateSearch(searchedChats.map(chat => {return {...chat, active: false}})))
        dispatch(ChatSliceManager.redusers.selectChat(null))
    }, [chats, dispatch, searchedChats])

    const handleClick = useCallback((id: string) => {
        reset()
        const newChats = chats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        dispatch(ChatSliceManager.redusers.update(newChats))
        dispatch(ChatSliceManager.redusers.selectChat(newChats.find(chat => chat.id === id) ?? null))
    }, [chats, dispatch, reset])

    const handleClickSearched = useCallback((id: string) => {
        reset()
        const findedChat = searchedChats.find(chat => chat.id === id)
        const newChats = searchedChats.map(chat => chat.id === id ? {...chat, active: true, numberNewMessage: 0}: {...chat, active: false})
        dispatch(ChatSliceManager.redusers.updateSearch(newChats))
        // запрос на сообщения делается по id, а тут id от юзера когда отправится, то будет ошибка. когда напишут сообщение, то вернется уже настоящий id
        dispatch(ChatSliceManager.redusers.selectChat(findedChat ? {...findedChat, id: ""}: null)) 
    }, [searchedChats, dispatch, reset])

    return(
        <div className={css.wrapper}>
            {searchedChats.length !== 0 && 
                <div>
                    {searchedChats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClickSearched}/>)}
                </div>
            }
            {chats.map(chat => <ChatOnPanel key={chat.id} {...chat} callback={handleClick}/>)}
        </div>
    )
}