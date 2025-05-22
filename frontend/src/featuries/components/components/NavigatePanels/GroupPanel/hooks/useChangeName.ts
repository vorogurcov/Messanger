import { useCallback } from "react";
import { useGroupListContext } from "../../../../pages/Home/hooks/useGroupListContext";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/useStore";
import { ChatSliceManager } from "../../../../../entities/store/featuries/chatSlice";
import { PanelGroupButtons } from "../../../../../entities/schemes/dto/Chat";

export default function useChangeNameGroup(thisGroup: PanelGroupButtons, inputRef: React.RefObject<HTMLInputElement | null>){
    const groups = useGroupListContext()
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const dispatch = useAppDispatch()

    const handleBlur = useCallback(() => {
        // Обработка ухода с фокуса
        if (inputRef.current?.value.length === 0){
            inputRef.current.focus();
            inputRef.current.style.color = 'red'
            inputRef.current.style.borderColor = 'red'
        } else if (inputRef.current){ // success
            const newChats = chats.map(
                chat => chat.group.find(gr => gr.id === thisGroup.id)
                ? {...chat, group: [...chat.group.filter(
                    gr => gr.id !== thisGroup.id
                ), {id: thisGroup.id, name: inputRef.current?.value ?? thisGroup.name}]}
                : chat
            )
            dispatch(ChatSliceManager.redusers.update(newChats))
            groups?.handleRename(thisGroup.id, inputRef.current.value)
            groups?.handleChangeState(groups.groups.map(gr => gr.id === thisGroup.id ? 
                {...gr, name: inputRef.current?.value ?? thisGroup.name, isChangeName: false} : gr))
            inputRef.current = null
        }
    }, [chats, dispatch, groups, thisGroup, inputRef]);
  
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Обработка нажатия Enter
            handleBlur()
        } else if (event.key === 'Escape' && inputRef.current){
            inputRef.current.value = thisGroup.name
            inputRef.current = null
            groups?.handleChangeState(groups.groups.map(gr => gr.name === thisGroup.name ? {...gr, isChangeName: false} : gr))
        }
    }, [thisGroup, handleBlur, groups, inputRef]);

    return {handleBlur, handleKeyDown}
  
}