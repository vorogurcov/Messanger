import { forwardRef, InputHTMLAttributes } from "react";
import css from "./css.module.scss"

const ChatInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>( ({className, ...props}, ref) => {
    return(
        <div style={{width: "100%"}} className={className}>
            {/* <div style={{position: "relative"}}>
                <div style={{position: "absolute", padding: "0px 16px 0px 16px", display: "flex", alignItems: "center", height: "40px"}}>
                    <img src={lupa} alt="search" style={{height: "16px", width:"16px"}}/>
                </div>
            </div> */}
            <input ref={ref} type="text" placeholder="Текст сообщения" className={`${css.input}`} {...props} />
        </div>
    )
})

export default ChatInput