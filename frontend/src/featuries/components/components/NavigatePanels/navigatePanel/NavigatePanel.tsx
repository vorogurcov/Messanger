import { ReactNode } from "react";
import VerticalPanelBase from "../VerticalPanelBase/VerticalPanel";

import css from "./css.module.scss"
import MovableNavigatePanelModal from "../../../modals/movableNavigatePanel/MovableNavigatePanel";

export default function NavigatePanel({buttons}: {buttons: ReactNode[]}){
    return(
        <div className={css.panel}>
            <div className={css.menu}>
                <MovableNavigatePanelModal/>
            </div>
            <div style={{width: "100%", flex: "1"}}>
                <VerticalPanelBase buttons={buttons}/>
            </div>
        </div>
    )
}