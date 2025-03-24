import { HTMLAttributes } from "react";
import RegistrationSVGcomp from "../SVGcomp/registrationSVGcomp/registrationSVGcomp";
import css from "./css.module.scss"
import NavigatePanel from "../NavigatePanels/navigatePanel/NavigatePanel";

interface Props extends HTMLAttributes<HTMLDivElement>{
    buttons?: React.ReactNode[]
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