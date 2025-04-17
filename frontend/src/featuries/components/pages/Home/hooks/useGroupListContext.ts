import { createContext, useContext } from "react";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";

export interface IGroupListContext{
    groups: PanelGroupButtons[]
    handleAdd: (name: string) => void
    handleDelete: (name: string) => void
    handleClick: (name: string) => void
    isChangeName: boolean
}

export const GroupListContext = createContext<IGroupListContext | null>(null)
export const useGroupListContext = () => useContext(GroupListContext)