import useCreateGroups from "./hooks/useCreateGroups"
import css from "./css.module.scss"
import InputLikeText from "../../../../UI/inputs/InputLikeText/InputLikeText"
import imgFolder from "../../../../../../../assets/img/filledFolder.png"
import ErrorMessage from "../../../../stylingString/errorMessage"
import ButtonLikeText from "../../../../UI/buttons/ButtonLikeText/ButtonLikeText"

export default function CreateGroup({handleClose, chatIds}: {handleClose: () => void, chatIds?: string[]}){
    const {handleSave, newGroup, setNewGroup, error} = useCreateGroups(handleClose)
    return(
        <div>
            <div className={css.head}>
                <span><b>Создание группы</b></span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "15px", position: "relative"}}>
                <InputLikeText 
                    value={newGroup.name} 
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    style={{height: "40px", fontSize: "90%", paddingRight: "40px"}}
                />
                <div style={{position: "absolute", right: 0, height: "100%", display: "flex", padding: "7px"}}>
                    <img src={imgFolder} alt="" style={{maxWidth: "100%", maxHeight: '100%'}}/>
                </div>
            </div>
            <div className={css.wrapperButtons}>
                <div className={css.but}>
                    <ButtonLikeText onClick={handleClose}>Отмена</ButtonLikeText>
                </div>
                <div className={css.but}>
                    <ButtonLikeText onClick={() => handleSave(chatIds)}>Создать</ButtonLikeText>
                </div> 
                <div style={{position: "absolute", bottom: "5px", right: "5px"}}>
                    <ErrorMessage>{error}</ErrorMessage>
                </div>
            </div>
        </div>
    )
}