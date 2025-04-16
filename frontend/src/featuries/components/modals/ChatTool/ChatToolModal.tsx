import ReactModal from "react-modal";
import css from "./css.module.scss"
import { SetStateAction, useEffect, useState } from "react";
import { ToolProps } from "./types";
import ListTools from "./components/ListTool/ListTools";
import { ChatContext } from "./hooks/useGetChat";
import { ChatList } from "../../../entities/schemes/dto/Chat";

function Modal({...props}: ReactModal.Props){
    return(
        <ReactModal 
            {...props}
            overlayClassName={props.overlayClassName??css.overlay}
            className={css.modal}
        >
            {props.children}
        </ReactModal>
    )
}

export default function ChatToolModal({chat, groupList, isOpen, coordinates, setIsOpen}: ToolProps){
    const [localChat, setLocalChat] = useState(chat)

    useEffect(() => { // удаление чата влечет за собой диспатч в сторе чата => localChat = null 
        if (!chat)
            setIsOpen(false)
        setLocalChat(chat)
    }, [chat, setIsOpen])

    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            {localChat &&
                <div style={{left: coordinates.x, top: coordinates.y}} className={css.conteiner}>
                    <ChatContext.Provider 
                        value={{
                            chat: localChat, 
                            setChat: setLocalChat as SetStateAction<ChatList>, 
                            groupList: groupList
                        }}>
                        <ListTools/> 
                    </ChatContext.Provider>
                </div>
            }
        </Modal>
    )
}