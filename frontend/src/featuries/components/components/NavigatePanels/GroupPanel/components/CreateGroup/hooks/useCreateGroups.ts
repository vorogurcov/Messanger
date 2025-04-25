import { useState } from "react";
import { ICreateGroup, initialCreateGroup } from "../../../../../../../entities/schemes/dto/Chat";
import ApiQuery from "../../../../../../../api/query";
import { useGroupListContext } from "../../../../../../pages/Home/hooks/useGroupListContext";

export default function useCreateGroups(handleClose: () => void){
    const [newGroup, setNewGroup] = useState<ICreateGroup>(initialCreateGroup)
    const [error, setError] = useState("")
    const groupManager = useGroupListContext()

    const handleSave = (chatIds?: string[]) => {
        if (newGroup.name.length <= 10 && newGroup.name.length > 0){
            groupManager?.handleAddGroup(newGroup.name, chatIds)
            .then(() => {
                handleClose()
                // тут диспатч на фильтр при условии что группа не все чаты
            })
        } else{
            if (newGroup.name.length > 10)
                setError("Название не больше 10 символов")
            else 
                setError("Название не может быть пустой строкой")
        }
    }

    return {newGroup, setNewGroup, handleSave, error}
}