import { forwardRef, HTMLAttributes, ReactNode } from "react"
import css from "./css.module.scss"

interface Props extends HTMLAttributes<HTMLDivElement>{
    srcImg: string
    label: ReactNode
}

const ListToolBase = forwardRef<HTMLDivElement, Props>(({srcImg, label, ...props}: Props, ref) => {
    return(
        <div ref={ref} className={css.wrapper} {...props}>
            <div className={css.wrapperImg}>
                <img src={srcImg} alt="" />
            </div>
            <div className={css.textWrap}>
                {label}
            </div>
        </div>
    )
})

export default ListToolBase