import GroupPanel from "../GroupPanel/GroupPanel";

import css from "./css.module.scss"
import { PanelGroupButtons } from "../../../../entities/schemes/dto/Chat";
import { lazy } from "react";
const MovableNavigatePanelModal = lazy(() => import("../../../modals/movableNavigatePanel/MovableNavigatePanel"));

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