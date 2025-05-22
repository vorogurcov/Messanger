import { ChatList, PanelGroupButtons } from "../../../entities/schemes/dto/Chat"

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
    groupList: PanelGroupButtons[]
}

export interface FolderToolProps extends IToolProps{
    thisFolder?: PanelGroupButtons
}

export interface IMessageToolsModal extends IToolProps{
    handleChange: () => void
    handleDelete: () => void
}

export enum ActionChatEnum {
    "delete",
    "changeGroup"
}