import { InputHTMLAttributes } from "react";
import lupa from "../../../../../../assets/img/lupa.png"
import css from "./css.module.scss"

export default function SearchInput({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <div style={{width: "100%", height: "100%"}}>
            <div style={{position: "relative"}}>
                <div style={{position: "absolute", padding: "0px 16px 0px 16px", display: "flex", alignItems: "center", height: "40px"}}>
                    <img src={lupa} alt="search" style={{height: "16px", width:"16px"}}/>
                </div>
            </div>
            <input type="text" placeholder="Поиск" {...props} className={css.input}/>
        </div>
    )
}