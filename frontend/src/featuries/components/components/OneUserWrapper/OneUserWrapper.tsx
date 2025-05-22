import { HTMLAttributes, memo } from "react"
import { UserLK } from "../../../entities/schemes/dto/User"

import css from "./css.module.scss"
import EntityOnPanelWrapper from "../EntityOnPanelWrapper/EntityOnPanelWrapper"

interface Props extends HTMLAttributes<HTMLDivElement>{
    user: UserLK
}

function TextInfo({userName, bio}: {userName: string, bio?: string}){
    return(
        <div className={css.wrapperText}>
            <div>
                <b>{userName}</b>
            </div>
            <div className={css.lastMes}>
                {bio}
            </div>
        </div>
    )
}

const OneUserWrapper = memo(function ({user, className, ...props}: Props){
    return(
        <EntityOnPanelWrapper
            {...props}
            className={`${css.wrapperEntityOnPanel} ${className}`}
            avatar={user.avatarUrl}
        >
            <TextInfo {...user}/>
        </EntityOnPanelWrapper>
    )
})

export default OneUserWrapper