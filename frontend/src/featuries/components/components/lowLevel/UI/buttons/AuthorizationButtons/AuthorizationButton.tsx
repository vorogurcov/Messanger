import { ButtonHTMLAttributes } from "react";

import css from "./authButton.module.css"

export default function AuthorizationBatton({...props}: ButtonHTMLAttributes<HTMLButtonElement>){
    return(
        <button {...props} className={css.css}>{props.children}</button>
    )
}