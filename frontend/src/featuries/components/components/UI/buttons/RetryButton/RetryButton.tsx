import { InputHTMLAttributes } from "react";
import retry from "../../../../../../assets/img/retry.png"

export default function RetryButton({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type="image" src={retry} alt="retry" {...props}/>
    )
}