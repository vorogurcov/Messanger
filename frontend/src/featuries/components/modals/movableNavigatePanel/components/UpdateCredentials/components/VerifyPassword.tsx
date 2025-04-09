import { useState } from "react";
import AuthorizationBatton from "../../../../../components/UI/buttons/AuthorizationButtons/AuthorizationButton";
import ApiQuery from "../../../../../../api/query";
import ErrorMessage from "../../../../../components/stylingString/errorMessage";
import { InputAuthorizationRow } from "../../../../../components/Authorization/AuthorizationRow/AuthorizationRow";

export default function VerifyPassword({callback}: {callback: (id: string) => void}){
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        ApiQuery.verifyPassword(password)
        .then((id) => callback(id))
        .catch((error) => {
            if (error.status === 403)
                setError("Неверный пароль")
        })
    }
    return(
        <div style={{width: "100%", height: "100%"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h3>Для сохранения введите пароль</h3>
            </div>
            <div>
                <InputAuthorizationRow type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div style={{position: "absolute", bottom: 0, width: "100%", padding: "0px 160px 60px 0px"}}> {/*см стили MovablenavPan */}
                <AuthorizationBatton onClick={handleSubmit}>Подтвердить</AuthorizationBatton>
                <ErrorMessage>{error}</ErrorMessage>
            </div>
        </div>
    )
}