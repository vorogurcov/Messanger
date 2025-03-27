import { ReactNode } from "react";

import css from "./css.module.scss"
import MovableNavigatePanelModal from "../../../../modals/movableNavigatePanel/MovableNavigatePanel";
import VerticalPanelBase from "../../../../components/NavigatePanels/VerticalPanelBase/VerticalPanel";

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