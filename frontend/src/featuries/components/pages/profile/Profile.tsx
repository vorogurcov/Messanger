import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { UserLK } from "../../../entities/schemes/dto/User";
import {UserSliceManager} from "../../../entities/store/featuries/userSlice";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import ApiQuery from "../../../api/query";

export default function Profile(){
    const dispatch = useAppDispatch()
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)
    const [localUser, setLocalUser] = useState(user); // Локальное состояние
    const [editable, setEditable] = useState(false);
    const [files, setFile] = useState<FileList | null>(null)
    console.log(files, "files")

    const handleClick = () => {
        ApiQuery.saveUserLK(localUser, files)
        .then(() => dispatch(UserSliceManager.fetching.save(localUser)))
        .catch((error) => console.log(error))
    }

    const keys = Object.keys(localUser)

    return(
        <MainWrapper>
            <div>
                {keys.map(key => key !== "avatarUrl" && key !== "birthDate" && 
                <div>
                    {key}
                    <input 
                        key={key} 
                        value={localUser[key as keyof typeof localUser]} 
                        onChange={(e) => setLocalUser({...localUser, [key]: e.target.value})}
                    />
                </div>)}
                <div>
                    <input type="date" onChange={(e) => setLocalUser({...localUser, birthDate: e.target.value})}/>
                </div>
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