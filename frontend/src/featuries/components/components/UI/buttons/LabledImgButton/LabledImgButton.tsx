import { InputHTMLAttributes, ReactNode } from "react";
import ImageButtonBase from "../ImageButtonBase/ImageButtonBase";

import css from "./css.module.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    label: ReactNode
}

export default function LabledImgButton({label, src, ...props}: Props){
    return(
        <div style={{width: "100%"}}>
            <ImageButtonBase src={src} {...props}/>
            <div style={{color: props.style?.color}} className={css.label}>
                {label}
            </div>
        </div>
    )
}