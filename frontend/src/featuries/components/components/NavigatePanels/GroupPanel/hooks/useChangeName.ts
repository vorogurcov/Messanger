import { useCallback } from "react";
import { useGroupListContext } from "../../../../pages/Home/hooks/useGroupListContext";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/useStore";
import { ChatSliceManager } from "../../../../../entities/store/featuries/chatSlice";

export default function useChangeNameGroup(thisName: string, inputRef: React.RefObject<HTMLInputElement | null>){
    const groups = useGroupListContext()
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const dispatch = useAppDispatch()

    const handleBlur = useCallback(() => {
        // Обработка ухода с фокуса
        console.log("blur")
        if (inputRef.current && (groups?.groups.find(gr => gr.name === inputRef.current?.value))){
            inputRef.current.focus();
            inputRef.current.style.color = 'red'
            inputRef.current.style.borderColor = 'red'
        } else if (inputRef.current && inputRef.current.value.length !== 0){ // success
            const newChats = chats.map(chat => chat.group === thisName ? {...chat, group: inputRef.current?.value ?? thisName} : chat)
            dispatch(ChatSliceManager.redusers.update(newChats))
            groups?.handleRename(thisName, inputRef.current.value)
            groups?.handleChangeState(groups.groups.map(gr => gr.name === thisName ? 
                {...gr, name: inputRef.current?.value ?? thisName, isChangeName: false} : gr))
            inputRef.current = null
        }
    }, [chats, dispatch, groups, thisName, inputRef]);
  
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Обработка нажатия Enter
            handleBlur()
        } else if (event.key === 'Escape' && inputRef.current){
            inputRef.current.value = thisName
            inputRef.current = null
            groups?.handleChangeState(groups.groups.map(gr => gr.name === thisName ? {...gr, isChangeName: false} : gr))
        }
    }, [thisName, handleBlur, groups, inputRef]);

    return {handleBlur, handleKeyDown}
  
}