import { memo, useEffect, useMemo, useState } from "react"
import scss_union from "../../../../../../mixins/mixinsCss/classes.module.scss"
import { ChatType, PageType } from "../../../../../entities/schemes/enums/chatEnum"
import css from "./css.module.scss"
import SearchInput from "../../../../components/UI/inputs/SearchInput/SearchInput"
import ChatList from "./ChatList/ChatList"
import useSearch from "../../../../../../hooks/useSearchUser"
import { UserLK } from "../../../../../entities/schemes/dto/User"
import ApiQuery from "../../../../../api/query"
import LoadingComponent from "../../../../components/LoadingComponent"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/useStore"
import { ChatSliceManager } from "../../../../../entities/store/featuries/chatSlice"
import { ChatListAdaptedProps } from "../../../../../entities/schemes/client/chat"
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice"

const TypeChat = memo(function ({type, selectedType, setSelectedType}: {type: string, selectedType: string, setSelectedType: React.Dispatch<React.SetStateAction<string>>}){
    return(
        <div className={css.type} style={{color: type === selectedType ? "black" : "#C5C6CC"}} onClick={() => setSelectedType(type)}>
            <b>{type}</b>
        </div>
    )
})

export default function ChatPanel({group, typePage, setTypeChat}: {
    group: string, 
    typePage: PageType,
    setTypeChat: React.Dispatch<React.SetStateAction<PageType>>
}){
    const [search, setSearch] = useState("")
    const {data: users, isLoading} = useSearch<UserLK>(search, ApiQuery.findUsers)
    const dispatch = useAppDispatch()
    const user = useAppSelector(UserSliceManager.selectors.selectUser)
    const adapted: ChatListAdaptedProps[] = useMemo(() => users.map(us => {return {
        name: us.userName, 
        numberNewMessage: 0, 
        active: false, 
        id: us.id, 
        type: ChatType.private, 
        group: "", 
        avatar: us.avatarUrl, 
        users: [us, user]
    }}), [user, users])

    useEffect(() => {
        dispatch(ChatSliceManager.redusers.updateSearch(adapted))
    }, [adapted, dispatch])

    return(
        <div className={css.wrap}>
            <div className={`${scss_union.hide_scroll} ${css.typeChat}`}>
                {Object.values(PageType).map((type, index) => 
                    <TypeChat 
                        key={index}
                        type={type} 
                        selectedType={typePage} 
                        setSelectedType={setTypeChat as React.Dispatch<React.SetStateAction<string>>}
                    />
                )}
            </div>
            <div className={css.input_wrap}>
                <SearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <LoadingComponent loading={isLoading}>
                <ChatList/>
            </LoadingComponent>
        </div>
    )
}