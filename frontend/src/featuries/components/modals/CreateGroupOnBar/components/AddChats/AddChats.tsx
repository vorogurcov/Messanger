import { memo, useCallback } from "react";
import { IAddChatProps } from "../../types";
import EntityOnPanelWrapper from "../../../../components/EntityOnPanelWrapper/EntityOnPanelWrapper";
import css from "./css.module.scss"
import ButtonLikeText from "../../../../components/UI/buttons/ButtonLikeText/ButtonLikeText";

const OneChat = memo(function({chat, handleClick}: {chat: IAddChatProps, handleClick: (chatId: string) => void}){
    return(
        <div>
            <EntityOnPanelWrapper 
                avatar={chat.avatar} 
                className={chat.selected ? css.wrapperActiveEntityOnPanel : css.wrapEntity}
                onClick={() => handleClick(chat.id)}
            >
                <div>
                    <b>{chat.name}</b>
                </div>
            </EntityOnPanelWrapper>
        </div>
    )
})

export default function AddChats({
    chats, setChats, handleContinue
}: {
    chats: IAddChatProps[], 
    setChats: React.Dispatch<React.SetStateAction<IAddChatProps[]>>,
    handleContinue: () => void
}){
    const handleClick = useCallback((id: string) => {
        setChats(state => state.map(chat => chat.id === id ? {...chat, selected: !chat.selected} : chat))
    }, [setChats])
    return(
        <>
        <div className={css.wrapper}>
            {chats.map(chat => <OneChat chat={chat} handleClick={handleClick}/>)}
        </div>
        <div className={css.buttonWrapper}>
            <div className={css.button}>
                <ButtonLikeText onClick={handleContinue}>Далее</ButtonLikeText>
            </div>
        </div>
        </>
    )
}