import { HTMLAttributes } from "react"
import css from "./css.module.css"

interface Props extends HTMLAttributes<HTMLDivElement>{
    isEnter: boolean
}

export default function AuthorizationBaseForm({children, isEnter, ...props}: Props){
    return(
        <div className={isEnter ? css.enter : css.reg} {...props}>
            <div className={css.inner}>
                <>
                    {children}
                </>
            </div>
        </div>
    )
}