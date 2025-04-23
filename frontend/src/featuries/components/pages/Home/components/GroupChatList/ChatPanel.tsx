import { memo } from "react"
import scss_union from "../../../../../../mixins/mixinsCss/classes.module.scss"
import { ChatType, PageType } from "../../../../../entities/schemes/enums/chatEnum"
import css from "./css.module.scss"
import SearchInput from "../../../../components/UI/inputs/SearchInput/SearchInput"
import ChatList from "./ChatList/ChatList"

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
                <SearchInput/>
            </div>
            <ChatList/>
        </div>
    )
}