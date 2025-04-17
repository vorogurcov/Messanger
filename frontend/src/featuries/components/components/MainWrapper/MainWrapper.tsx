import { HTMLAttributes } from "react";
import RegistrationSVGcomp from "../SVGcomp/registrationSVGcomp/registrationSVGcomp";
import css from "./css.module.scss"
import NavigatePanel from "../NavigatePanels/navigatePanel/NavigatePanel";
import { PanelGroupButtons } from "../../../entities/schemes/dto/Chat";

interface Props extends HTMLAttributes<HTMLDivElement>{
    buttons?: PanelGroupButtons[]
}

export default function MainWrapper({buttons, children, ...props}: Props){
    return(
        <div className={css.main}>
            <RegistrationSVGcomp/>
            <div className={css.wrapper} {...props}> {/* по умолчанию все блюрит */}
                <NavigatePanel buttons={buttons ?? []}/>
                <div className={css.child}>
                    {children}
                </div>
            </div>
        </div>
    )
}