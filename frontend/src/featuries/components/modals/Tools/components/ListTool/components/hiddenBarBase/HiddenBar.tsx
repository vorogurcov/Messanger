import { HTMLAttributes, useLayoutEffect, useState } from "react";
import css from "./css.module.scss"
import wrapCss from "../../css.module.scss"

export interface IHiddenBar extends HTMLAttributes<HTMLDivElement>{
    isOpen: boolean
    refLeftEl: React.RefObject<HTMLDivElement | null>
}

export default function HiddenBar({isOpen, refLeftEl, ...props}: IHiddenBar){
    const [topPosition, setTopPosition] = useState<number | undefined>(undefined);
    const [leftPosition, setLeftPosition] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        if (isOpen && refLeftEl.current) {
            const rect = refLeftEl.current.getBoundingClientRect();
            setLeftPosition(refLeftEl.current.clientWidth);
            //Используется метод getBoundingClientRect для получения координат элемента относительно окна.
            //window.scrollY добавляется для учета прокрутки страницы.
            //offsetParent используется для получения ближайшего позиционированного родителя. Через его getBoundingClientRect получаем его координату top.
            const offsetTop = rect.top + window.scrollY - (refLeftEl.current.offsetParent as HTMLElement).getBoundingClientRect().top;
            setTopPosition(offsetTop);
        }
    }, [isOpen, refLeftEl]);
    return(
        <div
            className={`${wrapCss.wrapper} ${css.hiddenBar}`}
            onMouseLeave={props.onMouseLeave}
            onMouseEnter={props.onMouseEnter}
            style={{top: topPosition, left: leftPosition}}
            {...props}
        >
            {props.children}
        </div>
    )
}