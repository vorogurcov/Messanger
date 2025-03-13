import { HTMLAttributes } from "react";
import css from "./BlueLink.module.scss"

export default function BlueLink({...props}: HTMLAttributes<HTMLElement>){
    return(
        <a onClick={props.onClick} {...props} className={css.css}>{props.children}</a>
    )
}