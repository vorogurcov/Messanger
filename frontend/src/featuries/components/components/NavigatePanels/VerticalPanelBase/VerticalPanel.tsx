import { memo, ReactNode } from "react"
import css from "./css.module.scss"

function OneButton({children}: {children: ReactNode}){
    console.log((children as any).props)
    return(
        <div className={css.oneBut}>
            {children}
        </div>
    )
}

const OneButtonMemo = memo(OneButton)

export default function VerticalPanelBase({buttons}: {buttons: ReactNode[]}){
    return(
        <div style={{width: "100%", height: "100%"}}>
            {buttons.map((button, index) => <OneButtonMemo key={index}>{button}</OneButtonMemo>)}
        </div>
    )
}