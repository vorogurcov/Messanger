import { MessagesDTO } from "../../../../../../../entities/schemes/dto/Chat";
import { UserLK } from "../../../../../../../entities/schemes/dto/User";
import Avatar from "../../../../../../components/Avatar/Avatar";
import BaseAvatar from "../../../../../../components/BaseAvatar/BaseAvatar";
import css from "./css.module.scss"

export function MessageBase({message, className, name}: {message: MessagesDTO, className?: string, name?: string}){
    const isoDate = new Date(message.createdAt)
    const hours = isoDate.getUTCHours().toString().padStart(2, '0');
    const minutes = isoDate.getUTCMinutes().toString().padStart(2, '0');
    return(
        <div className={`${css.wrapper} ${className}`}>
            {name && <div className={css.name}>
                {name}
            </div>}
            <div className={css.text}>
                {message.context}
            </div>
            <div className={css.info}>
                {hours}:{minutes}
            </div>
        </div>
    )
}

export function OwnerAccauntMessage({message}: {message: MessagesDTO}){
    return(
        <div className={css.mesWrapperOwner}>
            <MessageBase message={message} className={css.owner}/>
        </div>
    )
}

export function ForeignAccauntMessage({message, user, needInfo = false}: {message: MessagesDTO, user: UserLK | undefined, needInfo: boolean}){
    return(
        <div className={css.mesWrapper}>
            {needInfo && (user?.avatarUrl ? <Avatar src={user.avatarUrl}/> : <BaseAvatar/>)}
            <MessageBase message={message} className={css.foreign} name={needInfo ? user?.userName : undefined}/>
        </div>
    )
}
