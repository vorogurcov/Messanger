import { ReactNode, useEffect, useMemo, useState } from "react";
import MainModal from "../../../../modals/MainModal/MainModal";
import AutoHeightMainModal from "../../../../modals/MainModal/AutoHeightMainModal";
import CreateGroup from "../components/CreateGroup/CreateGroup";

export enum TypeOfClick{
    chat = "chat",
    folder = "folder"
}  

function CreateChat({onClose}: {onClose: () => void}){
    const [isOpen, setisOpen] = useState(false)
    useEffect(() => {
        setisOpen(true)
    }, [])
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
    const [isOpen, setisOpen] = useState(false)
    useEffect(() => {
        setisOpen(true)
    }, [])
    return(
        <AutoHeightMainModal
            isOpen={isOpen}
            onRequestClose={() => {
                setisOpen(false)
                onClose()
            }}
        >
            <CreateGroup handleClose={() => {
                setisOpen(false)
                onClose()
            }}/>
        </AutoHeightMainModal>
    )
}

export default function useCreateEntity(){
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