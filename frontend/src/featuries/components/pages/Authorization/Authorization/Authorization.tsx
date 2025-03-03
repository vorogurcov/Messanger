import { useState } from "react"
import { EnterForm } from "../enter/enter"
import Registration from "../registration/registration"

export default function Authorization(){
    const [isReg, setIsReg] = useState(true)
    return(
        <div>
            <div style={{display: "flex"}}>
                <div>
                    <button onClick={() => setIsReg(true)}>Вход</button>
                </div>
                <div>
                    <button onClick={() => setIsReg(false)}>Регистрация</button>
                </div>
            </div>
            {isReg ? <EnterForm/> : <Registration/>}
        </div>
    )
}