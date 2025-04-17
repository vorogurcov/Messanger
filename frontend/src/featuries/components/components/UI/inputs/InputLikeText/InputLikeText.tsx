import { InputHTMLAttributes } from "react";
import css from "./css.module.scss"

export default function InputLikeText({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input {...props} className={css.css}/>
    )
}