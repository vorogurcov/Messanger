import { InputHTMLAttributes } from "react";

export default function AuthorizationInput({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input {...props} className=""/>
    )
}