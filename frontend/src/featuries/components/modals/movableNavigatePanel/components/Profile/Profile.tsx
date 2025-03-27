import { useState } from "react"
import { useAppSelector } from "../../../../../../hooks/useStore"
import { UserLK } from "../../../../../entities/schemes/dto/User"
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice"
import Avatar from "../../../../components/Avatar/Avatar"
import BaseAvatar from "../../../../components/BaseAvatar/BaseAvatar"
import AddPhotoButton from "../../../../components/UI/buttons/AddPhotoButton/AddPhotoButton"
import { LabelAvatar } from "../Preview/Preview"

import css from "./css.module.scss"
import { InputAuthorizationRow } from "../../../../components/Authorization/AuthorizationRow/AuthorizationRow"
import { LabelUserLK, PlaceholderUserLK } from "../../../../../entities/schemes/enums/convertObjKeysToSmth"
import AuthorizationBatton from "../../../../components/UI/buttons/AuthorizationButtons/AuthorizationButton"
import ApiQuery from "../../../../../api/query"
import LoadingComponent from "../../../../components/LoadingComponent"

export default function Profile(){
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)
    const [localuser, setLocalUser] = useState<UserLK>(user)
    const [files, setFile] = useState<FileList | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSubmit = () => {
        setIsLoading(true)
        ApiQuery.saveUserLK(localuser, user.avatarUrl, files)
        .then(() => UserSliceManager.fetching.getData())
        .catch((error) => console.log(error, "error on save user"))
        .finally(() => setIsLoading(false))
    }
    return(
        <div className={css.wrapper}>
            <LoadingComponent loading={isLoading}>
                <div className={css.wrapperAvatarModule}>
                    <div className={`${css.wrapperAvatar} ${css.wrappers}`}>
                        <div style={{width: "150px", position: "relative"}}>
                            {localuser.avatarUrl !== undefined ? 
                            <Avatar src={localuser.avatarUrl} style={{width: "100%"}}/> 
                            : <BaseAvatar style={{width: "100%"}}/>}
                            <div className={css.addWrapper}>
                                <AddPhotoButton 
                                    handleDelete={() => setLocalUser({...localuser, avatarUrl: user.avatarUrl})}
                                    handleUpload={(file) => {
                                        setFile(file)
                                        file && setLocalUser({...localuser, avatarUrl: URL.createObjectURL(file[0])})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${css.wrappers}`} style={{marginTop: "10px"}}>
                        <div style={{fontSize: "80%"}}>@</div><LabelAvatar name={user.userName} style={{marginTop: "0px"}}/>
                    </div>
                </div>
                <div className={css.info}>
                    {Object.keys(localuser).map(
                        (key) => key !== "avatarUrl" &&
                        <InputAuthorizationRow
                            key={key} 
                            label={LabelUserLK[key as keyof typeof LabelUserLK]}
                            type={key.toLowerCase().indexOf("password") !== -1 ? "password" : key === "birthDate" ? "date" : "text"}
                            keyField={key} 
                            placeholder={PlaceholderUserLK[key as keyof typeof PlaceholderUserLK]}
                            value={localuser[key as keyof typeof localuser]} 
                            callback={(e) => setLocalUser((prev) => ({...prev, [key]: e.target.value}))}
                        />
                    )}
                    <div style={{position: "absolute", bottom: 0, width: "100%", padding: "0px 160px 60px 0px"}}> {/*см стили MovablenavPan */}
                        <AuthorizationBatton onClick={handleSubmit}>Сохранить изменения</AuthorizationBatton>
                    </div>
                </div>
            </LoadingComponent>
        </div>
    )
}