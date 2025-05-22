import { useRef, useState } from "react";
import AddUsersToChatCreate from "./components/AddUsersToChatCreate/AddUsersToChatCreate";
import TypeChatCreate from "./components/TypeChatCreate/TypeChatCreate";
import { StepOfCreateEnum } from "./types";
import { CreateChatDTO } from "../../../../../../entities/schemes/dto/Chat";
import processingCreateChat from "../../../../../../../utils/processingCreateChat";
import { ChatType } from "../../../../../../entities/schemes/enums/chatEnum";
import ApiQuery from "../../../../../../api/query";
import { useAppDispatch, useAppSelector } from "../../../../../../../hooks/useStore";
import { ChatSliceManager } from "../../../../../../entities/store/featuries/chatSlice";

export default function CreateChat({onClose}: {onClose: () => void}){
    const [step, setStep] = useState<StepOfCreateEnum>(StepOfCreateEnum.typeChat)
    const createChatRef = useRef<CreateChatDTO>(processingCreateChat("", ChatType.personal, []))
    const chats = useAppSelector(ChatSliceManager.selectors.selectChats)
    const dispatch = useAppDispatch()

    const handleContinue = (step: StepOfCreateEnum) => {
        setStep(step)
    }

    const handleCreate = async () => { // пока что не проверяется на дублирование
        const newChat = await ApiQuery.createChat(createChatRef.current)
        dispatch(ChatSliceManager.redusers.update([...chats, newChat]))
    }

    return(
        <>
            <TypeChatCreate step={step} handleContinue={handleContinue} createChatRef={createChatRef} handleClose={onClose}/>
            <AddUsersToChatCreate 
                step={step} 
                handleContinue={handleContinue} 
                createChatRef={createChatRef} 
                handleCreate={handleCreate}
                handleClose={onClose}
            />
        </>
    )
}