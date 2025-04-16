import { useCallback, useEffect } from "react";
import { ChatType } from "../../../../entities/schemes/enums/chatEnum";
import ApiQuery from "../../../../api/query";
import { GroupActionEnum, useGroupButtonsReduser } from "../../../../../hooks/useReducer/usegroupButtosReduser";

export default function useGroups(typeChat: ChatType){
    const [groupsState, disputchButtonsState] = useGroupButtonsReduser()
    
    const handleClick = useCallback((name: string) => 
        disputchButtonsState({type: GroupActionEnum.CHOOSE, name: name}), [disputchButtonsState])
    const handleDelete = useCallback((name: string) => { // не надо добавлять чат айди. это обособленная чать, которая используется много где
        disputchButtonsState({type: GroupActionEnum.DELETE_GROUP, name: name})
        // ApiQuery.deleteGroup(name)
    }, [disputchButtonsState])
    const handleAddGroup = useCallback((name: string) => {
        if (!groupsState.find(gr => gr.name === name))
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: [name]})
    }, [disputchButtonsState, groupsState])

    useEffect(() => {
        ApiQuery.getChatGroups(typeChat)
        .then((data) => {
            disputchButtonsState({type: GroupActionEnum.RESET_FORM} ); 
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: data.map(dt => dt.name)} )
        })

    }, [typeChat, disputchButtonsState])

    return {groupsState, handleClick, handleDelete, handleAddGroup}

}