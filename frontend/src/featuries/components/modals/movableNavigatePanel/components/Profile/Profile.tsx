import { useAppSelector } from "../../../../../../hooks/useStore"
import { UserLK } from "../../../../../entities/schemes/dto/User"
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice"
import Avatar from "../../../../components/Avatar/Avatar"
import BaseAvatar from "../../../../components/BaseAvatar/BaseAvatar"
import AddPhotoButton from "../../../../components/UI/buttons/AddPhotoButton/AddPhotoButton"
import { LabelAvatar } from "../Preview/Preview"

import css from "./css.module.scss"

export default function Profile(){
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)
    return(
        <div className={css.wrapper}>
            <div className={css.wrapperAvatarModule}>
                <div className={`${css.wrapperAvatar} ${css.wrappers}`}>
                    <div style={{width: "150px", position: "relative"}}>
                        {user.avatarUrl ? <Avatar src={user.avatarUrl} style={{width: "100%"}}/> : <BaseAvatar style={{width: "100%"}}/>}
                        <div className={css.addWrapper}>
                            <AddPhotoButton/>
                        </div>
                    </div>
                </div>
                <div className={`${css.wrappers}`}>
                    <LabelAvatar name={user.userName}/>
                </div>
                <div className={`${css.wrappers}`}>
                    @{user.login.length !== 0 ? user.login : "short_name"}
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}