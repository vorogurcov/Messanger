import { ButtonHTMLAttributes } from "react";
import css from "./css.module.scss"

export default function ButtonLikeText({...props}: ButtonHTMLAttributes<HTMLButtonElement>){
    return(
        <button {...props} className={css.but}>{props.children}</button>
    )
}