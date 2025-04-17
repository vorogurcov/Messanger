import { ChatList } from "../../../entities/schemes/dto/Chat"
import { IGroupList } from "./hooks/useGetChat"

export interface IGroupBar{
    ingroup: boolean
    nameGroup: string
}

export interface IToolProps{
    isOpen: boolean
    coordinates: {x: number, y: number}
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChatToolProps extends IToolProps{
    chat?: ChatList
    groupList: IGroupList[]
}

export interface FolderToolProps extends IToolProps{
    thisFolder?: IGroupList
}

export enum ActionChatEnum {
    "delete",
    "changeGroup"
}