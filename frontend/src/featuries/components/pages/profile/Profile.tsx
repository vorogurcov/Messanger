import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { UserLK } from "../../../entities/schemes/dto/User";
import {UserSliceManager} from "../../../entities/store/featuries/userSlice";
import MainWrapper from "../../components/MainWrapper/MainWrapper";

export default function Profile(){
    const dispatch = useAppDispatch()
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)
    const [localUser, setLocalUser] = useState(user); // Локальное состояние
    const [editable, setEditable] = useState(false);
    const [files, setFile] = useState<FileList | null>(null)
    console.log(files, "files")

    const handleClick = () => {
        dispatch(UserSliceManager.fetching.save(localUser))
    }

    const keys = Object.keys(localUser)

    return(
        <MainWrapper>
            <div>
                {keys.map(key => key !== "avatarUrl" && 
                <div>
                    {key}
                    <input 
                        key={key} 
                        value={localUser[key as keyof typeof localUser]} 
                        onChange={(e) => setLocalUser({...localUser, [key]: e.target.value})}
                    />
                </div>)}
                <div>
                    <form action="">
                        <label htmlFor="fileInput">Выберите файл:</label>
                        <input type="file" id="fileInput" onChange={(e) => e.target.files && setFile(e.target.files)}/>
                    </form>
                </div>
            </div>
        </MainWrapper>
    )
}