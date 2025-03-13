import { InputHTMLAttributes } from "react";
import css from "./css.module.scss"

export default function ImageButtonBase({src, ...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <div className={css.wrap} style={props.style}>
            <input type="image" src={src} {...props} alt="click" className={css.but}/>
        </div>
    )
}