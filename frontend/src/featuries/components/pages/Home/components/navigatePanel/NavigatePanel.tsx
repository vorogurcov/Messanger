import { ReactNode } from "react";
import VerticalPanelBase from "../../../../components/NavigatePanels/VerticalPanelBase/VerticalPanel";
import Menu from "../buttons/menu/menu";

import css from "./css.module.scss"

export default function NavigatePanel({buttons}: {buttons: ReactNode[]}){
    return(
        <div className={css.panel}>
            <div className={css.menu}>
                <Menu/>
            </div>
            <div style={{width: "100%", flex: "1"}}>
                <VerticalPanelBase buttons={buttons}/>
            </div>
        </div>
    )
}