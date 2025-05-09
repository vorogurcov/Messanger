import { InputHTMLAttributes } from "react";
import css from "./css.module.scss"

export default function ChatInput({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <div style={{width: "100%"}}>
            {/* <div style={{position: "relative"}}>
                <div style={{position: "absolute", padding: "0px 16px 0px 16px", display: "flex", alignItems: "center", height: "40px"}}>
                    <img src={lupa} alt="search" style={{height: "16px", width:"16px"}}/>
                </div>
            </div> */}
            <input type="text" placeholder="Текст сообщения" {...props} className={css.input}/>
        </div>
    )
}