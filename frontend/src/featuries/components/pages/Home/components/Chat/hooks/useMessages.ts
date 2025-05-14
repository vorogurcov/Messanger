import { useCallback, useEffect, useState } from "react"
import { MessagesDTO } from "../../../../../../entities/schemes/dto/Chat"
import ApiQuery from "../../../../../../api/query"
import { ChatListAdaptedProps } from "../../../../../../entities/schemes/client/chat"
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import processingCreateChat, { createNameChat } from "../../../../../../../utils/processingCreateChat"
import { UserSliceManager } from "../../../../../../entities/store/featuries/userSlice"
import { ChatType } from "../../../../../../entities/schemes/enums/chatEnum"

export default function useMessages(chatId: string){
    const [messages, setMessages] = useState<MessagesDTO[]>([])
    const [isLoadingChat, setIsloading] = useState(false)
    const chatState = useAppSelector(ChatSliceManager.selectors.selectState)
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setIsloading(true)
        chatId.length !== 0 ? ApiQuery.getMessages(chatId)
        .then(data => setMessages(data)) 
        .finally(() => setIsloading(false)) : setMessages([])
    }, [chatId])

    const processCreateChat = useCallback(async (chat: ChatListAdaptedProps) => {
        const newUser = chat.users.find(us => us.id !== user.id) ?? {id: ""}
        const newChat = processingCreateChat(createNameChat(chat.name, user.userName), ChatType.personal, chat.users.map(us => us.id))
        const createdChat = {...(await ApiQuery.createChat(newChat)), active: true}
        dispatch(ChatSliceManager.redusers.updateSearch(
            chatState.searched.filter(serchchat => serchchat.id !== newUser.id))
        )
        dispatch(ChatSliceManager.redusers.selectChat(createdChat))
        return createdChat
    }, [chatState.searched, dispatch, user.id, user.userName])

    const sendMessage = useCallback(async (chat: ChatListAdaptedProps, message: string) => {
        let newChat = {...chat}
        if (!chatState.data.find(curchat => curchat.id === chat.id)){ // из серча отправлено сообщение в чате, которого еще нет
            newChat = await processCreateChat(newChat)
        }
        const mess = await ApiQuery.sendMessage(message, newChat.id)
        newChat = {...newChat, lastMessage: mess}
        if (chatState.data.find(curchat => curchat.id === chat.id)){
            dispatch(ChatSliceManager.redusers.update(chatState.data.map(curchat => curchat.id === newChat.id ? newChat : curchat)))
        } else{
            dispatch(ChatSliceManager.redusers.update([...chatState.data, newChat]))
        }
        setMessages([...messages, mess])
    }, [chatState.data, dispatch, messages, processCreateChat])

    return {messages, isLoadingChat, sendMessage}
}