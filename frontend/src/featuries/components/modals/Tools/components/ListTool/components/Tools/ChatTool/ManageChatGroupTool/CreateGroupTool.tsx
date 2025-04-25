import ListToolBase from "../../../../../ListToolBase/ListToolBase";
import imageSrc from "../../../../../../../../../../assets/img/createFolder.png"
import { useState } from "react";
import AutoHeightMainModal from "../../../../../../../MainModal/AutoHeightMainModal";
import CreateGroup from "../../../../../../../../components/NavigatePanels/GroupPanel/components/CreateGroup/CreateGroup";

export default function CreateGroupTool({handleClose, chatId}: {handleClose: () => void, chatId: string}){
    const [isOpen, setIsOpen ] = useState(false)
    const onClose = () => {
        setIsOpen(false)
        handleClose()
    }
    return(
        <>
        <ListToolBase srcImg={imageSrc} label="Создать" onClick={() => setIsOpen(true)}/>
        <AutoHeightMainModal
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <CreateGroup handleClose={onClose} chatIds={[chatId]}/>
        </AutoHeightMainModal>
        </>
    )
}