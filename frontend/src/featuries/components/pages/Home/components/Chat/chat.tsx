import css from "./css.module.scss"
import { useAppSelector } from "../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../entities/store/featuries/chatSlice"
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice"
import LoadingComponent from "../../../../components/LoadingComponent"
import useMessages from "./hooks/useMessages"
import { ForeignAccauntMessage, OwnerAccauntMessage } from "./components/Message/Message"
import PanelChat from "./components/PanelChat/PanelChat"
import ChatInput from "../../../../components/UI/inputs/ChatInput/ChatInput"
import { useEffect, useMemo, useRef } from "react"
import { MessagesDTO } from "../../../../../entities/schemes/dto/Chat"
import { formatDateToDMYLocal, isNextDay } from "./utils"
import { ChatListAdaptedProps } from "../../../../../entities/schemes/client/chat"
import { ChatType } from "../../../../../entities/schemes/enums/chatEnum"

function ContextDay({prevMes, curMes, senderIsOwner, chat}: {
    prevMes?: MessagesDTO, curMes: MessagesDTO, senderIsOwner: boolean, chat: ChatListAdaptedProps
}){
    const sender = useMemo(() => chat.users.find(us => us.id === curMes.senderId), [chat.users, curMes.senderId]) // в OwnerAccauntMessage не передается
    return(
        <>
            {prevMes && isNextDay(prevMes.createdAt, curMes.createdAt) &&
                <div className={css.day}>
                    <b>{formatDateToDMYLocal(curMes.createdAt)}</b>
                </div>
            }
            {senderIsOwner ? 
                <OwnerAccauntMessage message={curMes}/> : 
                <ForeignAccauntMessage message={curMes} user={sender} needInfo={chat.type == ChatType.group}/>
            }
        </>
    )
}

export default function Chat(){
    const chat = useAppSelector(ChatSliceManager.selectors.selectSelected)
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const {messages, isLoadingChat, sendMessage} = useMessages(chat?.id ?? "")
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)

    // Автопрокрутка при изменении сообщений
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Зависимость от массива сообщений

    const handleSend = () => {
        if (inputRef.current && chat){
            sendMessage(chat, inputRef.current.value)
            inputRef.current.value = ""
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter"){
            handleSend()
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return(
        <>
            {chat && 
            <div className={css.chat}>
                <PanelChat chat={chat}/>
                <div className={css.wrapper}>
                    <div className={`${css.messages}`}>
                        {messages.map((mess, index) => 
                            <ContextDay 
                                key={mess.id}
                                curMes={mess} 
                                prevMes={messages[index-1]} 
                                senderIsOwner={user.id === mess.senderId}
                                chat={chat}
                            />
                        )}
                        <div ref={messagesEndRef} /> {/* Невидимый якорь для прокрутки */}
                    </div>
                </div>
                <ChatInput ref={inputRef} onKeyDown={handleKeyDown} className={css.inputWrap}/>
            </div>}
        </>
    )
}