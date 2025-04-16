import { createContext, useContext } from "react";

export interface IGroupListContext{
    groups: {
        name: string,
        active: boolean
    }[]
    handleAdd: (name: string) => void
    handleDelete: (name: string) => void
}

export const GroupListContext = createContext<IGroupListContext | null>(null)
export const useGroupListContext = () => useContext(GroupListContext)