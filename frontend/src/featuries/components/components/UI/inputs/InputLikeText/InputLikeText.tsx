import { forwardRef, InputHTMLAttributes } from "react";
import css from "./css.module.scss"

const InputLikeText = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return(
        <input ref={ref} {...props} className={css.css} aria-hidden="false"/>
    )
})

export default InputLikeText 