import { InputHTMLAttributes } from "react";

import css from "./css.module.scss"

export default function Avatar({src, ...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <div {...props} className={css.avatar}>
            <img src={src} alt="avatar" />
        </div>
    )
}