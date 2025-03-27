import { HTMLAttributes } from "react";
import { useAppSelector } from "../../../../../../hooks/useStore";
import { UserLK } from "../../../../../entities/schemes/dto/User";
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice";
import Avatar from "../../../../components/Avatar/Avatar";
import BaseAvatar from "../../../../components/BaseAvatar/BaseAvatar";

import css from "./css.module.scss"

interface LabelProps extends HTMLAttributes<HTMLDivElement>{
    name: string
}

export function LabelAvatar({name, ...props}: LabelProps){
    return(
        <div className={css.name} {...props}>
            {name.length !== 0 ? name : "username"}
        </div>
    )
}

export default function Preview(){
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)
    return(
        <div className={css.wrapper}>
            <div className={css.info}>
                <div>
                {user.avatarUrl !== undefined ? // не приводи, т к null лажает
                <Avatar src={user.avatarUrl}/> 
                : <BaseAvatar/>}
                </div>
                <LabelAvatar name={user.userName}/>
            </div>
        </div>
    )
}