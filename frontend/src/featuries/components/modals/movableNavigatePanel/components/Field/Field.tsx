import { HTMLAttributes, memo } from "react";

import css from "./css.module.scss"

interface Props extends HTMLAttributes<HTMLDivElement>{
    imgesSrc: {active: string, notActive: string},
    label: string,
    active: boolean
}

const FieldPanel = memo(({imgesSrc, label, active, onClick}: Props) => {
    return(
        <div onClick={onClick} className={css.field} style={{backgroundColor: active ? "#006FFD" : "" }}>
            <div className={css.imgWrapper}>
                <img src={active ? imgesSrc.active : imgesSrc.notActive} alt="" />
            </div>
            <div style={{color: active ? "white" : "black"}}>
                {label}
            </div>
        </div>
    )
})

export default FieldPanel