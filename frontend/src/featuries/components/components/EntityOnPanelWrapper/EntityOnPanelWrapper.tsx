import { HTMLAttributes } from "react";
import css from "./css.module.scss"
import BaseAvatar from "../BaseAvatar/BaseAvatar";
import Avatar from "../Avatar/Avatar";

interface Props extends HTMLAttributes<HTMLDivElement>{
    avatar?: string
}

export default function EntityOnPanelWrapper({avatar, children, className, ...props}: Props){
    return(
        <div 
            className={`${css.nothoveringEntityOnPanel} ${className}`}
            {...props}
        >
            <div className={css.wrapperAvatar}>
                {avatar ? <Avatar src={avatar}/> : <BaseAvatar/> }
            </div>
            {children}
        </div>
    )
}