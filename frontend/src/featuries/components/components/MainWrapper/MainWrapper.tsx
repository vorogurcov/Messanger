import { HTMLAttributes } from "react";
import RegistrationSVGcomp from "../SVGcomp/registrationSVGcomp/registrationSVGcomp";
import css from "./css.module.scss"

export default function MainWrapper({children, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div className={css.main}>
            <RegistrationSVGcomp/>
            <div className={css.wrapper} {...props}> {/* по умолчанию все блюрит */}
                {children}
            </div>
        </div>
    )
}