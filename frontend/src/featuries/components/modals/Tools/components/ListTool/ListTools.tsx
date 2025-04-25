import css from "./css.module.scss"
import { HTMLAttributes } from "react";

export default function ListTools({...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div className={css.wrapWrapper} {...props}>
            <div className={css.wrapper}>
                {props.children}
            </div>
        </div>
    )
}