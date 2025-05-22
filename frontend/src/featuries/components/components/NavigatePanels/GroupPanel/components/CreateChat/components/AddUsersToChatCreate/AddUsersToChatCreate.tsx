import { useEffect, useState } from "react";
import { CreateChatDTO } from "../../../../../../../../entities/schemes/dto/Chat";
import AutoHeightMainModal from "../../../../../../../modals/MainModal/AutoHeightMainModal";
import { StepOfCreateEnum } from "../../types";
import BlueScroll from "../../../../../../stylingString/BlueScroll/BlueScroll";
import css from "./css.module.scss"
import { ChatType } from "../../../../../../../../entities/schemes/enums/chatEnum";
import AuthorizationInput from "../../../../../../UI/inputs/AuthorizationInputs/AuthorizationInput";
import AddUserPanel from "../../../../../../AddUserPanel/AddUserPanel";
import { UserLK } from "../../../../../../../../entities/schemes/dto/User";
import OneUserWrapper from "../../../../../../OneUserWrapper/OneUserWrapper";
import ButtonLikeText from "../../../../../../UI/buttons/ButtonLikeText/ButtonLikeText";
import LoadingComponent from "../../../../../../LoadingComponent";
import { useAppSelector } from "../../../../../../../../../hooks/useStore";
import { UserSliceManager } from "../../../../../../../../entities/store/featuries/userSlice";

export default function AddUsersToChatCreate({
    step, handleContinue, createChatRef, handleCreate, handleClose
}: {
    step: StepOfCreateEnum, 
    handleContinue: (step: StepOfCreateEnum) => void, 
    createChatRef: React.RefObject<CreateChatDTO>,
    handleCreate: () => Promise<void>,
    handleClose: () => void
}){
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [nameChat, setNameChat] = useState("")
    const [users, setUsers] = useState<UserLK[]>([])
    const thisuser = useAppSelector(UserSliceManager.selectors.selectUser)

    useEffect(() => {
        setIsOpen(step === StepOfCreateEnum.addUSers)
        setUsers([]) // костыль, по-хорошему дисплей делать вне компонента, тогда при none оно бы сбрасывалось
        setNameChat("")
    }, [step])

    const handleAddUser = (user: UserLK) => {
        if (users.find(us => us.id === user.id))
            return
        if (createChatRef.current.type === ChatType.group)
            setUsers([...users, user])
        else if (createChatRef.current.type === ChatType.personal){
            setUsers([user])
            setNameChat(`Chat: ${thisuser.userName} & ${user.userName}`)
        }
    }

    const onClose = () => {
        setIsOpen(false)
        handleClose()
    }

    const onSubmit = () => {
        createChatRef.current.userIds = users.map(us => us.id)
        createChatRef.current.name = nameChat
        setIsLoading(true)
        handleCreate()
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    }

    return(
        <AutoHeightMainModal
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <LoadingComponent loading={isLoading}>
                {createChatRef.current.type === ChatType.group && 
                <>
                    <BlueScroll label="Название группы"/>
                    <div className={css.content}>
                        <AuthorizationInput placeholder="Придумайте название" value={nameChat} onChange={(e) => {
                            setNameChat(e.target.value)
                            createChatRef.current.name = e.target.value
                        }}/>
                    </div>
                </>}
                <BlueScroll label="С кем хотите создать чат?"/>
                <div className={css.content}>
                    <AddUserPanel handleSelect={handleAddUser}/>
                    {users.map(us =>
                        <OneUserWrapper 
                            key={us.id}
                            user={us}
                            onClick={() => setUsers(users.filter(user => user.id !== us.id))}
                        />
                    )}
                </div>
                <div className={css.wrapperButtons}>
                    <div className={css.but}>
                        <ButtonLikeText onClick={() => handleContinue(StepOfCreateEnum.typeChat)}>
                            Назад
                        </ButtonLikeText>
                    </div>
                    <div className={css.but}>
                        <ButtonLikeText disabled={users.length === 0} onClick={onSubmit}>
                            Создать
                        </ButtonLikeText>
                    </div>
                </div>
            </LoadingComponent>
        </AutoHeightMainModal>
    )
}