import { memo } from "react"
import scss_union from "../../../../../../mixins/mixinsCss/classes.module.scss"
import { ChatType } from "../../../../../entities/schemes/enums/chatEnum"
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

export default function ChatPanel({group, typeChat, setTypeChat}: {
    group: string, 
    typeChat: ChatType,
    setTypeChat: React.Dispatch<React.SetStateAction<ChatType>>
}){
    return(
        <div className={css.wrap}>
            <div className={`${scss_union.hide_scroll} ${css.typeChat}`}>
                {Object.values(ChatType).map((type, index) => 
                    <TypeChat 
                        key={index}
                        type={type} 
                        selectedType={typeChat} 
                        setSelectedType={setTypeChat as React.Dispatch<React.SetStateAction<string>>}
                    />
                )}
            </div>
            <div className={css.input_wrap}>
                <SearchInput/>
            </div>
            <ChatList group={group} typeChat={typeChat}/>
        </div>
    )
}