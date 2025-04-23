import useCreateGroups from "./hooks/useCreateGroups"
import css from "./css.module.scss"
import { InputAuthorizationRow } from "../../../../components/Authorization/AuthorizationRow/AuthorizationRow"

export default function CreateGroup(){
    const {handleSave, newGroup, setNewGroup, error} = useCreateGroups()
    return(
        <div>
            <div className={css.head}>
                <span style={{display: "flex", justifyContent: "center", fontSize: "140%"}}><b>Создание группы</b></span>
            </div>
            <div>
                <InputAuthorizationRow 
                    label="Название"
                    error={error} 
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    placeholder="Придумайте название"
                />
            </div>
            <div>
                
            </div>
        </div>
    )
}