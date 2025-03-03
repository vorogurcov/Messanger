import { ButtonHTMLAttributes } from "react";

export default function AuthorizationBatton({...props}: ButtonHTMLAttributes<HTMLButtonElement>){
    return(
        <button {...props}>{props.children}</button>
    )
}