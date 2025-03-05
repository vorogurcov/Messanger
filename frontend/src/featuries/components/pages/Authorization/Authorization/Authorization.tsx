import { useState } from "react"
import { EnterForm } from "../enter/enter"
import Registration from "../registration/registration"
import RegistrationSVGcomp from "../../../components/lowLevel/SVGcomp/registrationSVGcomp/registrationSVGcomp"

import css from "./css.module.css"

export default function Authorization(): React.ReactElement{
    const [isEnter, setIsEnter] = useState(true)
    return(
        <>
        <div className={css.main}>
            {isEnter ? null : <RegistrationSVGcomp/>}
            {isEnter ? <EnterForm callbackToggle={() => setIsEnter(false)}/> : <Registration callbackToggle={() => setIsEnter(true)}/>}
        </div>
        </>
    )
}