import { useCallback, useEffect, useState } from "react";
import { allChats, ChatType } from "../../../../entities/schemes/enums/chatEnum";
import ApiQuery from "../../../../api/query";
import { GroupActionEnum, useGroupButtonsReduser } from "../../../../../hooks/useReducer/usegroupButtosReduser";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";
import { ChatSliceManager } from "../../../../entities/store/featuries/chatSlice";
import { useAppDispatch } from "../../../../../hooks/useStore";

export default function useGroups(typeChat: ChatType){
    const [groups, disputchButtonsState] = useGroupButtonsReduser()
    const [nameActiveGroup, setNameActiveGroup] = useState(allChats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const active = groups.find(gr => gr.active)?.name
        if (active && active !== nameActiveGroup)
            setNameActiveGroup(active)
    }, [groups, setNameActiveGroup]) // nameActiveGroup меняется только тут

    useEffect(() => {
        if (nameActiveGroup === allChats)
            dispatch(ChatSliceManager.fetching.getAllChats())
        else{

        }
    }, [nameActiveGroup, dispatch])

    useEffect(() => {
        ApiQuery.getChatGroups()
        .then((data) => {
            disputchButtonsState({type: GroupActionEnum.RESET_FORM}); 
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: data})
        })
    }, [disputchButtonsState])
    
    const handleClick = useCallback((id: string) => {
        disputchButtonsState({type: GroupActionEnum.CHOOSE, id: id})
        dispatch(ChatSliceManager.fetching.getChatsByGroup(id))
    }, [disputchButtonsState, dispatch])
    
    const handleDelete = useCallback((id: string) => { // не надо добавлять чат айди. это обособленная чать, которая используется много где
        disputchButtonsState({type: GroupActionEnum.DELETE_GROUP, id: id})
        // ApiQuery.deleteGroup(name)
    }, [disputchButtonsState])

    const handleAddGroup = useCallback(async (name: string) => {
        const idNewGroup = await ApiQuery.addGroup(name)
        if (!groups.find(gr => gr.name === name))
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: [{name: name, id: idNewGroup}]})
    }, [disputchButtonsState, groups])

    const handleRename = useCallback((id: string, oldName: string, newName: string) => {
        disputchButtonsState({type: GroupActionEnum.RENAME_GROUP, id: id, oldName: oldName, newName: newName})
    }, [disputchButtonsState])

    const handleChangeState = useCallback((newState: PanelGroupButtons[]) => {
        disputchButtonsState({type: GroupActionEnum.CHANGE_STATE, newState: newState})
    }, [disputchButtonsState])

    // useEffect(() => {
    //     ApiQuery.getChatGroups(typeChat)
    //     .then((data) => {
    //         disputchButtonsState({type: GroupActionEnum.RESET_FORM} ); 
    //         disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: data.map(dt => dt.name)} )
    //     })

    // }, [typeChat, disputchButtonsState])

    return {groups, handleClick, handleDelete, handleAddGroup, handleRename, handleChangeState}
}