import { createContext, useContext } from "react";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";

export interface IGroupListContext{
    groups: PanelGroupButtons[]
    handleAddGroup: (name: string, chatIds?: string[]) => Promise<void>
    handleDelete: (id: string) => void
    handleClick: (id: string) => void
    handleRename: (id: string, oldName: string, newName: string) => void
    handleChangeState: (newGroup: PanelGroupButtons[]) => void
}

export const GroupListContext = createContext<IGroupListContext | null>(null)
export const useGroupListContext = () => useContext(GroupListContext)