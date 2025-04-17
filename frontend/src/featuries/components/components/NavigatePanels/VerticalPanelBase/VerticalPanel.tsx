import { memo, ReactNode } from "react"
import css from "./css.module.scss"
import FolderToolModal from "../../../modals/Tools/FolderToolModal"
import useContextMenu from "../../../pages/Home/hooks/useContextMenu"
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat"
import { allChats } from "../../../../entities/schemes/enums/chatEnum"
import ChatButton from "../../../pages/Home/components/buttons/chat"
import FolderButton from "../../../pages/Home/components/buttons/folder"
import { useGroupListContext } from "../../../pages/Home/hooks/useGroupListContext"

function OneButton({folder, children}: {folder: PanelGroupButtons, children: ReactNode}){
    const {coordinates, showTools, setShowTools, handleContextMenu} = useContextMenu()
    return(
        <>
        <div 
            className={css.oneBut}
            onContextMenu={handleContextMenu}
        >
            {children}
        </div>
        <FolderToolModal
            isOpen={showTools}
            setIsOpen={setShowTools}
            coordinates={coordinates}
            thisFolder={folder}
        />
        </>
    )
}

const OneButtonMemo = memo(OneButton)

export default function VerticalPanelBase({buttons}: {buttons: PanelGroupButtons[]}){
    const groupManager = useGroupListContext()
    return(
        <div style={{width: "100%", height: "100%"}}>
            {buttons.map((button) => button.name === allChats ? 
                <OneButtonMemo folder={button}>{<ChatButton {...button} onClick={() => groupManager?.handleClick(button.name)}/>}</OneButtonMemo>
                : <OneButtonMemo key={button.name} folder={button}>{<FolderButton {...button} onClick={() => groupManager?.handleClick(button.name)}/>}</OneButtonMemo>
            )}
        </div>
    )
}