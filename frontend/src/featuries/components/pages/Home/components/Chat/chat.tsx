import css from "./css.module.scss"
import template_css from "../../../../../../mixins/mixinsCss/classes.module.scss" 
import { useAppSelector } from "../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../entities/store/featuries/chatSlice"
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice"
import LoadingComponent from "../../../../components/LoadingComponent"
import useMessages from "./hooks/useMessages"
import { ForeignAccauntMessage, OwnerAccauntMessage } from "./components/Message/Message"
import PanelChat from "./components/PanelChat/PanelChat"
import ChatInput from "../../../../components/UI/inputs/ChatInput/ChatInput"
import { useMemo } from "react"
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
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const chat = useMemo(() => chats.find(chat => chat.active), [chats])
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const {messages, isLoadingChat} = useMessages(chat?.id ?? "")

    //наверное, сделай тут контекст и передай чат, а внутри OwnerAccauntMessage и ForeignAccauntMessage определяй, надо ли делать аватарки
    return(
        <>
            {chat && 
            <div className={css.chat}>
                <PanelChat chat={chat}/>
                <div className={css.wrapper}>
                    <div className={`${css.messages} ${template_css.hide_scroll}`}>
                        {messages.map((mess, index) => 
                            <ContextDay 
                                curMes={mess} 
                                prevMes={messages[index-1]} 
                                senderIsOwner={user.id === mess.senderId}
                                chat={chat}
                            />
                        )}
                    </div>
                    <ChatInput/>
                </div>
            </div>}
        </>
    )
}