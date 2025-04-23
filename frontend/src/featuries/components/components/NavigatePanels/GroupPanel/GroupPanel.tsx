import { memo, ReactNode, useEffect, useRef, useState } from "react"
import css from "./css.module.scss"
import FolderToolModal from "../../../modals/Tools/FolderToolModal"
import useContextMenu from "../../../pages/Home/hooks/useContextMenu"
import { initialPanelGroupButtons, PanelGroupButtons } from "../../../../entities/schemes/dto/Chat"
import { allChats } from "../../../../entities/schemes/enums/chatEnum"
import ChatButton from "../../../pages/Home/components/buttons/chat"
import FolderButton from "../../../pages/Home/components/buttons/folder"
import { useGroupListContext } from "../../../pages/Home/hooks/useGroupListContext"
import useChangeNameGroup from "./hooks/useChangeName"
import InputLikeText from "../../UI/inputs/InputLikeText/InputLikeText"
import AddButonLikePlus from "../../UI/buttons/AddButonLikePlus"
import MainModal from "../../../modals/MainModal/MainModal"

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
        {folder.name !== allChats &&
            <FolderToolModal
                isOpen={showTools}
                setIsOpen={setShowTools}
                coordinates={coordinates}
                thisFolder={folder}
            />
        }
        </>
    )
}

const OneButtonMemo = memo(OneButton)

export default function GroupPanel({buttons}: {buttons: PanelGroupButtons[]}){
    const groupManager = useGroupListContext()
    const [changingFolder, setChangingFolder] = useState<PanelGroupButtons>(initialPanelGroupButtons)
    const inputRef = useRef<HTMLInputElement>(null)
    const {handleBlur, handleKeyDown} = useChangeNameGroup(changingFolder, inputRef)
    const [addGroupOpen, setAddGroupOpen] = useState(false)

    useEffect(() => {
        const changingButton = buttons.find(but => but.isChangeName)
        if (changingButton){
            setChangingFolder(changingButton)
        } else setChangingFolder(initialPanelGroupButtons)
    }, [buttons])

    useEffect(() => {
        if (inputRef.current){
            inputRef.current.value = changingFolder?.name ?? ""
            setTimeout(() => inputRef.current?.focus(), 0) 
            // проблема: ref меняется в модальном окне, где align-hedden = true, от чего невозможно зафокусить. setTimeout - решение
        }
    }, [changingFolder])
    return(
        <>
        <div style={{width: "100%", height: "100%"}}>
            {buttons.map((button) => button.name === allChats ? 
                <OneButtonMemo folder={button}>{
                    <ChatButton {...button} onClick={() => groupManager?.handleClick(button.name)}/>
                }</OneButtonMemo>
                : <OneButtonMemo key={button.name} folder={button}>{
                    button.id !== changingFolder.id ?
                    <FolderButton 
                        {...button} 
                        onClick={() => groupManager?.handleClick(button.name)}
                    /> :
                    <FolderButton
                        active={button.active}
                        name={
                            <InputLikeText 
                                ref={inputRef}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                        }
                    /> 
                }</OneButtonMemo>
            )}
            <AddButonLikePlus name="+ чат" onClick={() => setAddGroupOpen(true)}/>
        </div>
        <MainModal
            isOpen={addGroupOpen}
            onRequestClose={() => setAddGroupOpen(false)}
        >
            
        </MainModal>
        </>
    )
}