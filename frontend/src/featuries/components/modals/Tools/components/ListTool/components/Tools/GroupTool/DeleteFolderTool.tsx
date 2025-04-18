import { HTMLAttributes, useCallback } from "react"
import { DeleteTool } from "../ChatTool/DeleteChatTool"
import { useAppDispatch, useAppSelector } from "../../../../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../../../../entities/store/featuries/chatSlice"
import { useGroupListContext } from "../../../../../../../pages/Home/hooks/useGroupListContext"
import { allChats } from "../../../../../../../../entities/schemes/enums/chatEnum"
import { PanelGroupButtons } from "../../../../../../../../entities/schemes/dto/Chat"

interface IDeleteFolderTool extends HTMLAttributes<HTMLDivElement>{
    thisFolder: PanelGroupButtons
}
export default function DeleteFolderTool({thisFolder, ...props}: IDeleteFolderTool){
    const groups = useGroupListContext()
    const dispatch = useAppDispatch()
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const handleDelete = useCallback(() => {
        if (thisFolder.name !== allChats){
            dispatch(ChatSliceManager.redusers.update(chats.map(chat => chat.group === thisFolder.name ? {...chat, group: allChats}: chat)))
            groups?.handleDelete(thisFolder.name)
            console.log("deeel", thisFolder)
        }
    }, [thisFolder, dispatch, chats, groups])

    return(
        <DeleteTool {...props} onClick={handleDelete}/>
    )
}