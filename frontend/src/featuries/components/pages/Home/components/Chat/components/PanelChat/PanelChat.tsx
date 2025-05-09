import { ChatListAdaptedProps } from "../../../../../../../entities/schemes/client/chat";
import EntityOnPanelWrapper from "../../../../../../components/EntityOnPanelWrapper/EntityOnPanelWrapper";
import css from "./css.module.scss"
import mobImg from "../../../../../../../../assets/img/mobile.png"
import searchImg from "../../../../../../../../assets/img/blueLupa.png"
import moreInfoImg from "../../../../../../../../assets/img/moreInfo.png"

function OneTool({src}: {src: string}){
    return(
        <div className={css.onetool}>
            <img src={src} alt="" />
        </div>
    )
}

export default function PanelChat({chat}: {chat: ChatListAdaptedProps}){
    return(
        <div className={css.panel}>
            <EntityOnPanelWrapper avatar={chat.avatar} className={css.chatInfo}>
                <div className={css.wrapperText}>
                    <b>{chat.name}</b>
                </div>
            </EntityOnPanelWrapper>
            <div className={css.tools}>
                <OneTool src={mobImg}/>
                <OneTool src={searchImg}/>
                <OneTool src={moreInfoImg}/>
            </div>
        </div>
    )
}