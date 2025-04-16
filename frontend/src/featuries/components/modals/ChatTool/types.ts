import { ChatList } from "../../../entities/schemes/dto/Chat"
import { IGroupList } from "./hooks/useGetChat"

export interface IGroupBar{
    ingroup: boolean
    nameGroup: string
}

export interface ToolProps{
    chat?: ChatList
    groupList: IGroupList[]
    isOpen: boolean
    coordinates: {x: number, y: number}
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export enum ActionChatEnum {
    "delete",
    "changeGroup"
}