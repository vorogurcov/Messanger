import { ImgHTMLAttributes } from "react";

import css from "./css.module.scss"

export default function Avatar({src, className, ...props}: ImgHTMLAttributes<HTMLImageElement>){
    return(
        <div {...props} className={`${css.avatar} ${className}`}>
            <img src={src} alt="avatar" />
        </div>
    )
}