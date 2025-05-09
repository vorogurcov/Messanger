import { useEffect, useState } from "react"
import { MessagesDTO } from "../../../../../../entities/schemes/dto/Chat"
import ApiQuery from "../../../../../../api/query"

export default function useMessages(chatId: string){
    const [messages, setMessages] = useState<MessagesDTO[]>([])
    const [isLoadingChat, setIsloading] = useState(false)

    useEffect(() => {
        setIsloading(true)
        chatId.length !==0 && ApiQuery.getMessages(chatId)
        .then(data => setMessages(data)) 
        .finally(() => setIsloading(false))
    }, [chatId])

    return {messages, isLoadingChat}
}