import { HTMLAttributes } from "react";
import css from "./css.module.scss"

export default function BaseAvatar({className, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div className={`${css.wrapper} ${className}`} {...props}>
            <div className={css.person}>
                <div className={css.head_wrapper}>
                    <div className={css.head}/>
                </div>
                <div className={css.body}/>
            </div>
        </div>
    )
}