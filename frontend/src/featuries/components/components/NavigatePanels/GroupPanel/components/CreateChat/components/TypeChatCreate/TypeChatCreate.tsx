import { useEffect, useState } from "react";
import AutoHeightMainModal from "../../../../../../../modals/MainModal/AutoHeightMainModal";
import { AdaptedLabelEnum, StepOfCreateEnum } from "../../types";

import css from "./css.module.scss"
import ButtonLikeText from "../../../../../../UI/buttons/ButtonLikeText/ButtonLikeText";
import { ChatType } from "../../../../../../../../entities/schemes/enums/chatEnum";
import BlueScroll from "../../../../../../stylingString/BlueScroll/BlueScroll";
import { CreateChatDTO } from "../../../../../../../../entities/schemes/dto/Chat";

function MyRadio({label, handleClick, checked}: {label: string, handleClick: () => void, checked: boolean}){
    return(
        <label className={css.radioLabel} onClick={handleClick}>
            <input type="radio" name="choice" checked={checked}/>
            <span className={css.radioCustom}/>
            <span className={css.radioText}>{label}</span>
        </label>
    )
}

export default function TypeChatCreate({
    step, handleContinue, createChatRef, handleClose
}: {
    step: StepOfCreateEnum, 
    handleContinue: (step: StepOfCreateEnum) => void, 
    createChatRef: React.RefObject<CreateChatDTO>,
    handleClose: () => void
}){
    const [isOpen, setIsOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<ChatType | null>(null)

    useEffect(() => {
        setIsOpen(step === StepOfCreateEnum.typeChat)
    }, [step])

    const handleClick = (key: keyof typeof ChatType) => {
        setSelectedType(ChatType[key])
        createChatRef.current.type = ChatType[key]
    }

    return(
        <AutoHeightMainModal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false)
                handleClose()
            }}
        >
            <div>
                <BlueScroll label="Выберите тип чата"/>
                <div className={`${css.radioGroup} ${css.content}`}>
                    {Object.keys(AdaptedLabelEnum).map(key => 
                        <MyRadio 
                            key={key} 
                            label={AdaptedLabelEnum[key as keyof typeof AdaptedLabelEnum]}
                            handleClick={() => handleClick(key as keyof typeof ChatType)}
                            checked={selectedType === ChatType[key as keyof typeof ChatType]}
                        />
                    )}
                </div>
                <div className={css.wrapperButtons}>
                    <div className={css.but}>
                        <ButtonLikeText disabled={!selectedType} onClick={() => handleContinue(StepOfCreateEnum.addUSers)}>
                            Далее
                        </ButtonLikeText>
                    </div>
                </div>
            </div>
        </AutoHeightMainModal>
    )
}