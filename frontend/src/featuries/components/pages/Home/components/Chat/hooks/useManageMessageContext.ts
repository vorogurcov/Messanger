import { createContext, useContext } from "react";
import { MessagesDTO } from "../../../../../../entities/schemes/dto/Chat";

interface IContext{
    handleUpdate: (message: MessagesDTO) => void
    handleDelete: (message: MessagesDTO) => void
}

export const ManageMessageContext = createContext<IContext | null>( null)
export const useManageMessageContext = () => useContext(ManageMessageContext)