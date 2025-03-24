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

    const handleClick = () => {
        dispatch(UserSliceManager.fetching.save(localUser))
    }

    console.log(user, "userGlobal")

    return(
        <MainWrapper>
            <div>
                {localUser.userName}
                <div>
                    change name
                </div>
                <input type="text" onChange={(e) => setLocalUser({...localUser, userName: e.target.value})}/>
                <button onClick={handleClick}>save</button>
            </div>
        </MainWrapper>
    )
}