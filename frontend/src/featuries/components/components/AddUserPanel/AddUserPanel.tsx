import { useCallback, useState } from "react";
import useSearch from "../../../../hooks/useSearchUser";
import { UserLK } from "../../../entities/schemes/dto/User";
import SearchInput from "../UI/inputs/SearchInput/SearchInput";
import ApiQuery from "../../../api/query";
import OneUserWrapper from "../OneUserWrapper/OneUserWrapper";
import css from "./css.module.scss"
import LoadingComponent from "../LoadingComponent";
import { useAppSelector } from "../../../../hooks/useStore";
import { UserSliceManager } from "../../../entities/store/featuries/userSlice";

export default function AddUserPanel({handleSelect}: {handleSelect: (user: UserLK) => void}){
    const [search, setSearch] = useState("")
    const {data: users, isLoading} = useSearch<UserLK>(search, ApiQuery.findUsers)
    const thisUser = useAppSelector(UserSliceManager.selectors.selectUser)

    const handleClick = useCallback((user: UserLK) => {
        setSearch("")
        handleSelect(user)
    }, [handleSelect])
    
    return(
        <div className={css.wrapper}>
            <div>
                <SearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <LoadingComponent loading={isLoading}>
                <div className={css.users}>
                    {users.map(us => us.id !== thisUser.id && 
                    <OneUserWrapper 
                        key={us.id}
                        user={us} 
                        onClick={() => handleClick(us)}
                        className={css.wrapperEntityOnPanel}
                    />)}
                </div>
            </LoadingComponent>
        </div>
    )
}