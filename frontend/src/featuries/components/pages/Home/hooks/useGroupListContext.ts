import { createContext, useContext } from "react";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";

export interface IGroupListContext{
    groups: PanelGroupButtons[]
    handleAddGroup: (name: string) => void
    handleDelete: (name: string) => void
    handleClick: (name: string) => void
    handleRename: (oldName: string, newName: string) => void
    handleChangeState: (newGroup: PanelGroupButtons[]) => void
}

export const GroupListContext = createContext<IGroupListContext | null>(null)
export const useGroupListContext = () => useContext(GroupListContext)