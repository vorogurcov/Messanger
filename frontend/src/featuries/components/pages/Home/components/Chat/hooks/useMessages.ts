import { useCallback, useEffect, useState } from "react"
import { MessagesDTO } from "../../../../../../entities/schemes/dto/Chat"
import ApiQuery from "../../../../../../api/query"
import { ChatListAdaptedProps } from "../../../../../../entities/schemes/client/chat"
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice"
import processingCreateChat, { createNameChat } from "../../../../../../../utils/processingCreateChat"
import { UserSliceManager } from "../../../../../../entities/store/featuries/userSlice"
import { ChatType } from "../../../../../../entities/schemes/enums/chatEnum"
import core from "../../../../../../../core/core";

export default function useMessages(chatId: string){
    const [messages, setMessages] = useState<MessagesDTO[]>([])
    const [isLoadingChat, setIsLoading] = useState(false)

    const chatState = useAppSelector(ChatSliceManager.selectors.selectState)
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setIsLoading(true)
        if (chatId.length !== 0) {
            ApiQuery.getMessages(chatId)
                .then(data => setMessages(data))
                .finally(() => setIsLoading(false))
        } else {
            setMessages([])
            setIsLoading(false)
        }
    }, [chatId])

    const processCreateChat = useCallback(async (chat: ChatListAdaptedProps) => {
        const newUser = chat.users.find(us => us.id !== user.id) ?? {id: ""}
        const newChat = processingCreateChat(
            createNameChat(chat.name, user.userName),
            ChatType.personal,
            [newUser.id]
        )
        const createdChat = {...(await ApiQuery.createChat(newChat)), active: true}
        dispatch(ChatSliceManager.redusers.updateSearch(
            chatState.searched.filter(s => s.id !== newUser.id)
        ))
        dispatch(ChatSliceManager.redusers.selectChat(createdChat))
        return createdChat
    }, [chatState.searched, dispatch, user.id, user.userName])

    const sendMessage = useCallback(async (chat: ChatListAdaptedProps, message: string) => {
        let newChat = {...chat}
        if (!chatState.data.find(c => c.id === chat.id)) {
            newChat = await processCreateChat(newChat)
        }
        const mess = await ApiQuery.sendMessage(message, newChat.id)
        newChat = {...newChat, lastMessage: mess}
        dispatch(ChatSliceManager.redusers.selectChat(newChat))
        if (chatState.data.find(c => c.id === chat.id)) {
            dispatch(ChatSliceManager.redusers.update(
                chatState.data.map(c => c.id === newChat.id ? newChat : c)
            ))
        } else {
            dispatch(ChatSliceManager.redusers.update([
                ...chatState.data, newChat
            ]))
        }
        setMessages(prev => [...prev, mess])
    }, [chatState.data, dispatch, processCreateChat])

    const updateMessage = useCallback((chat: ChatListAdaptedProps, message: MessagesDTO) => {
        ApiQuery.updateMessage(chat.id, message)
        if (message.id === chat.lastMessage?.id) {
            const updatedChat: ChatListAdaptedProps = {...chat, lastMessage: message}
            dispatch(ChatSliceManager.redusers.update(
                chatState.data.map(c => c.id === updatedChat.id ? updatedChat : c)
            ))
        }
        setMessages(prev => prev.map(m => m.id === message.id ? message : m))
    }, [chatState.data, dispatch])

    const deleteMessage = useCallback((chat: ChatListAdaptedProps, message: MessagesDTO) => {
        ApiQuery.deleteMessage(chat.id, message.id)
        if (message.id === chat.lastMessage?.id) {
            const remaining = messages.slice(0, -1)
            const newLast = remaining[remaining.length - 1]
            const updatedChat: ChatListAdaptedProps = {
                ...chat,
                lastMessage: newLast
            }
            dispatch(ChatSliceManager.redusers.update(
                chatState.data.map(c => c.id === updatedChat.id ? updatedChat : c)
            ))
        }
        setMessages(prev => prev.filter(m => m.id !== message.id))
    }, [chatState.data, dispatch, messages])

    // Локальное создание сообщения
    const createLocalMessage = useCallback(
        (chat: ChatListAdaptedProps, newMessage: MessagesDTO) => {

            function base64UrlToBase64(base64Url:string) {
                return base64Url.replace(/-/g, '+').replace(/_/g, '/');
            }
            const token = localStorage.getItem(core.localStorageKeys.access_token) ?? ""
            const payloadBase64Url = token.split('.')[1];
            const payloadBase64 = base64UrlToBase64(payloadBase64Url);
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);

            const userId = payload.sub;
            if(newMessage.senderId === userId)
                return

            setMessages(prev => [...prev, newMessage])

            const updatedChat: ChatListAdaptedProps = {
                ...chat,
                lastMessage: newMessage
            }
            dispatch(ChatSliceManager.redusers.update(
                chatState.data.map(c => c.id === updatedChat.id ? updatedChat : c)
            ))
            if (!chatState.data.find(c => c.id === updatedChat.id)) {
                dispatch(ChatSliceManager.redusers.update([
                    ...chatState.data, updatedChat
                ]))
            }
        },
        [chatState.data, dispatch]
    )

    // Локальное обновление сообщения
    const updateLocalMessage = useCallback(
        (chat: ChatListAdaptedProps, updatedMessage: MessagesDTO) => {

            function base64UrlToBase64(base64Url:string) {
                return base64Url.replace(/-/g, '+').replace(/_/g, '/');
            }
            const token = localStorage.getItem(core.localStorageKeys.access_token) ?? ""

            const payloadBase64Url = token.split('.')[1];
            const payloadBase64 = base64UrlToBase64(payloadBase64Url);
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);

            const userId = payload.sub;
            if(updatedMessage.senderId === userId)
                return

            setMessages(prev =>
                prev.map(m => m.id === updatedMessage.id ? updatedMessage : m)
            )

            if (chat.lastMessage?.id === updatedMessage.id) {
                const updatedChat: ChatListAdaptedProps = {
                    ...chat,
                    lastMessage: updatedMessage
                }
                dispatch(ChatSliceManager.redusers.update(
                    chatState.data.map(c => c.id === updatedChat.id ? updatedChat : c)
                ))
            }
        },
        [chatState.data, dispatch]
    )

    // Локальное удаление сообщения
    const deleteLocalMessage = useCallback((chat: ChatListAdaptedProps, message: MessagesDTO) => {
        function base64UrlToBase64(base64Url:string) {
            return base64Url.replace(/-/g, '+').replace(/_/g, '/');
        }
        const token = localStorage.getItem(core.localStorageKeys.access_token) ?? ""

        const payloadBase64Url = token.split('.')[1];
        const payloadBase64 = base64UrlToBase64(payloadBase64Url);
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const userId = payload.sub;
        if(message.senderId === userId)
            return


        if (message.id === chat.lastMessage?.id) {
            const remaining = messages.slice(0, -1)
            const newLast = remaining[remaining.length - 1]
            const updatedChat: ChatListAdaptedProps = {
                ...chat,
                lastMessage: newLast
            }
            dispatch(ChatSliceManager.redusers.update(
                chatState.data.map(c => c.id === updatedChat.id ? updatedChat : c)
            ))
        }
        setMessages(prev => prev.filter(m => m.id !== message.id))
    }, [chatState.data, dispatch, messages])

    return {
        messages,
        isLoadingChat,
        sendMessage,
        updateMessage,
        deleteMessage,
        createLocalMessage,
        updateLocalMessage,
        deleteLocalMessage
    }
}
