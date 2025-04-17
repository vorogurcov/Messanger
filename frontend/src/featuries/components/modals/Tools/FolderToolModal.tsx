import { useEffect, useState } from "react"
import { ModalTool } from "./ChatToolModal"
import { FolderToolProps } from "./types"

import css from "./css.module.scss"
import ListTools from "./components/ListTool/ListTools"
import DeleteFolderTool from "./components/ListTool/components/Tools/DeleteFolderTool"

export default function FolderToolModal({thisFolder, isOpen, coordinates, setIsOpen}: FolderToolProps){
    const [localFolder, setLocalFolder] = useState(thisFolder)
    
    useEffect(() => { // удаление чата влечет за собой диспатч в сторе чата => localChat = null 
        if (!thisFolder)
            setIsOpen(false)
        setLocalFolder(thisFolder)
    }, [thisFolder, setIsOpen])

    return(
        <ModalTool
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            {localFolder &&
                <div style={{left: coordinates.x, top: coordinates.y}} className={css.conteiner}>
                    <ListTools>
                        <DeleteFolderTool thisFolder={localFolder}/>
                    </ListTools> 
                </div>
            }
        </ModalTool>
    )
}