import GroupPanel from "../GroupPanel/GroupPanel";

import css from "./css.module.scss"
import MovableNavigatePanelModal from "../../../modals/movableNavigatePanel/MovableNavigatePanel";
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";

export default function NavigatePanel({buttons}: {buttons: PanelGroupButtons[]}){
    return(
        <div className={css.panel}>
            <div className={css.menu}>
                <MovableNavigatePanelModal/>
            </div>
            <div style={{width: "100%", flex: "1"}}>
                <GroupPanel buttons={buttons}/>
            </div>
        </div>
    )
}