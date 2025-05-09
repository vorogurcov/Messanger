import AutoHeightMainModal from "../MainModal/AutoHeightMainModal"
import CreateGroup from "../../components/NavigatePanels/GroupPanel/components/CreateGroup/CreateGroup"
import { useEffect, useMemo, useState } from "react"
import { IAddChatProps } from "./types"
import ApiQuery from "../../../api/query"
import LoadingComponent from "../../components/LoadingComponent"
import AddChats from "./components/AddChats/AddChats"

enum PageEnum{
    addUsers = 'addUsers',
    fillFields = 'fillFields'
}

export default function CreateGroupOnBar({isOpen, onClose}: {isOpen: boolean, onClose: () => void} ){
    const [chats, setChats] = useState<IAddChatProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedKeyPage, setSelectedKeyPage] = useState<PageEnum>(PageEnum.addUsers)
    const pages = useMemo(() => {
        return {
            [PageEnum.addUsers]: 
                <AddChats chats={chats} setChats={setChats} handleContinue={() => setSelectedKeyPage(PageEnum.fillFields)}/>,
            [PageEnum.fillFields]: 
                <CreateGroup handleClose={() => {onClose()}} chatIds={chats.filter(chat => chat.selected).map(chat => chat.id) ?? []}/>,
        }
    }, [chats, onClose])

    useEffect(() => {
        ApiQuery.getChatLists()
        .then((data) => setChats(data.map(chat => {return {...chat, selected: false}})))
        .finally(() => setIsLoading(false))
    }, [])
    
    return(
        <AutoHeightMainModal
            isOpen={isOpen}
            onRequestClose={() => {
                onClose()
            }}
        >
            <LoadingComponent loading={isLoading}>
                {pages[selectedKeyPage]}
            </LoadingComponent>
        </AutoHeightMainModal>
    )
}