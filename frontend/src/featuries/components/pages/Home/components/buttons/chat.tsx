import LabledImgButton from "../../../../components/UI/buttons/LabledImgButton/LabledImgButton";
import chat from "../../../../../../assets/img/chat.png"
import activeChat from "../../../../../../assets/img/filledChat.png"
import { LabeledButtonProps } from "../../../../../entities/schemes/dto/buttonProps";

export default function ChatButton({name: label, active, ...props}: LabeledButtonProps){
    return(
        <LabledImgButton src={active ? activeChat: chat} label={label} {...props}/>
    )
}