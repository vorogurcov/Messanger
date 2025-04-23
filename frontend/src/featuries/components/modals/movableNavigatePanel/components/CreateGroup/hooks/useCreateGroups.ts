import { useEffect, useState } from "react";
import { ChatList, ICreateGroup, initialCreateGroup } from "../../../../../../entities/schemes/dto/Chat";
import ApiQuery from "../../../../../../api/query";

export default function useCreateGroups(){
    const [newGroup, setNewGroup] = useState<ICreateGroup>(initialCreateGroup)
    const [error, setError] = useState("")
    const [chats, setChats] = useState<ChatList[]>([])

    useEffect(() => {
        ApiQuery.getChatLists()
    })

    const handleSave = () => {

    }

    return {newGroup, setNewGroup, handleSave, error}
}