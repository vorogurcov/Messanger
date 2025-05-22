import { useMemo, useState } from "react";
import CreateGroupOnBar from "../../../../modals/CreateGroupOnBar/CreateGroupOnBar";
import CreateChat from "../components/CreateChat/CreateChat";

export enum TypeOfClick{
    chat = "chat",
    folder = "folder"
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