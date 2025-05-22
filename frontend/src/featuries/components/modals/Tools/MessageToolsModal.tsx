import { ModalTool } from "./ChatToolModal"
import { DeleteTool } from "./components/ListTool/components/Tools/ChatTool/DeleteChatTool"
import ListTools from "./components/ListTool/ListTools"
import { IMessageToolsModal } from "./types"
import imageSrc from "../../../../assets/img/rename.png"
import ListToolBase from "./components/ListToolBase/ListToolBase"
import css from "./css.module.scss"

export default function MessageToolsModal({handleChange, handleDelete, isOpen, coordinates, setIsOpen}: IMessageToolsModal){
    return(
        <ModalTool
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <div style={{left: coordinates.x, top: coordinates.y}} className={css.conteiner}>
                <ListTools>
                    <ListToolBase srcImg={imageSrc} label="Изменить" onClick={() => {
                        handleChange()
                        setIsOpen(false)
                    }}/>
                    <DeleteTool onClick={() => {
                        handleDelete()
                        setIsOpen(false)
                    }}/>
                </ListTools> 
            </div>
        </ModalTool>
    )
}