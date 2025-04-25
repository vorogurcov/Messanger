import { useCallback, useEffect } from "react";
import { allChats, PageType } from "../../../../entities/schemes/enums/chatEnum";
import ApiQuery from "../../../../api/query";
import { GroupActionEnum, useGroupButtonsReduser } from "../../../../../hooks/useReducer/usegroupButtosReduser";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";
import { ChatSliceManager } from "../../../../entities/store/featuries/chatSlice";
import { useAppDispatch } from "../../../../../hooks/useStore";

export default function useGroups(typeChat: PageType){
    const [groups, disputchButtonsState] = useGroupButtonsReduser()
    const dispatch = useAppDispatch()
    console.log("groups", groups)

    useEffect(() => {
        dispatch(ChatSliceManager.fetching.getAllChats())
    }, [dispatch])

    useEffect(() => {
        ApiQuery.getChatGroups()
        .then((data) => {
            disputchButtonsState({type: GroupActionEnum.RESET_FORM}); 
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: data})
        })
    }, [disputchButtonsState])
    
    const handleClick = useCallback((id: string) => {
        if (groups.find(gr => gr.active)?.id??"" !== id){
            if (id === allChats){
                dispatch(ChatSliceManager.fetching.getAllChats())
            }
            else{
                dispatch(ChatSliceManager.fetching.getChatsByGroup(id))
            }
            disputchButtonsState({type: GroupActionEnum.CLICK_ON_GROUP, id: id})
        }
    }, [disputchButtonsState, dispatch, groups])
    
    const handleDelete = useCallback((id: string) => { // не надо добавлять чат айди. это обособленная чать, которая используется много где
        ApiQuery.deleteGroup(id)
        .then(() => {
            disputchButtonsState({type: GroupActionEnum.DELETE_GROUP, id: id})
        })
    }, [disputchButtonsState])

    const handleAddGroup = useCallback(async (name: string, chatIds?: string[]) => {
        const idNewGroup = await ApiQuery.addGroup(name, chatIds)
        if (!groups.find(gr => gr.name === name))
            disputchButtonsState({type: GroupActionEnum.ADD_GROUPS, names: [{name: name, id: idNewGroup}]})
    }, [disputchButtonsState, groups])

    const handleRename = useCallback((id: string, newName: string) => {
        ApiQuery.updateGroup(id, newName)
        disputchButtonsState({type: GroupActionEnum.RENAME_GROUP, id, newName})
    }, [disputchButtonsState])

    const handleChangeState = useCallback((newState: PanelGroupButtons[]) => {
        disputchButtonsState({type: GroupActionEnum.CHANGE_STATE, newState: newState})
    }, [disputchButtonsState])

    return {groups, handleClick, handleDelete, handleAddGroup, handleRename, handleChangeState}
}