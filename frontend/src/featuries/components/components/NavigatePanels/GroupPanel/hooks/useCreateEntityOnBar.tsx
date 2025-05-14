import { useMemo, useState } from "react";
import MainModal from "../../../../modals/MainModal/MainModal";
import CreateGroupOnBar from "../../../../modals/CreateGroupOnBar/CreateGroupOnBar";

export enum TypeOfClick{
    chat = "chat",
    folder = "folder"
}  

function CreateChat({onClose}: {onClose: () => void}){
    const [isOpen, setisOpen] = useState(true)
    return(
        <MainModal
            isOpen={isOpen}
            onRequestClose={() => {
                setisOpen(false)
                onClose()
            }}
        >
            <div>
                Создание чата
            </div>
        </MainModal>
    )
}

function CreateGroupLocal({onClose}: {onClose: () => void} ){
    const [isOpen, setisOpen] = useState(true)
    return(
        <CreateGroupOnBar isOpen={isOpen} onClose={() => {
            setisOpen(false)
            onClose()
        }}/>
    )
}

export default function useCreateEntityOnBar(){
    const [typeClick, setTypeClick] = useState<TypeOfClick | null>(null)
    const component = useMemo(() => {
        const components = {
           [TypeOfClick.chat]: <CreateChat onClose={() => setTypeClick(null)}/>,
           [TypeOfClick.folder]: <CreateGroupLocal onClose={() => setTypeClick(null)}/> 
        }
        return typeClick ? components[typeClick] : null
    }, [typeClick])

    return {component, setTypeClick}
}