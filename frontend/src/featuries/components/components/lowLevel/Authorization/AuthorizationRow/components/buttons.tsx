import { InputHTMLAttributes } from "react"
import show from "../images/show.png"
import hide from "../images/hide.png"

export function ShowButton({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
      <input type="image" src={show} alt="show" {...props} style={{width: "16px"}}/>
    )
}
  
export  function HideButton({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
      <input type="image" src={hide} alt="hide" {...props} style={{width: "16px"}}/>
    )
}