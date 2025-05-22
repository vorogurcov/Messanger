import { forwardRef, InputHTMLAttributes } from "react";
import css from "./css.module.scss"

const ChatInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>( ({className, ...props}, ref) => {
    return(
        <div style={{width: "100%"}} className={className}>
            <input ref={ref} type="text" placeholder="Текст сообщения" className={`${css.input}`} {...props} />
        </div>
    )
})

export default ChatInput