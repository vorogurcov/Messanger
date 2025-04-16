import { HTMLAttributes, useRef, useState } from "react";
import ListToolBase from "../../../../ListToolBase/ListToolBase";
import css from "../../../css.module.scss"
import imageFolder from "../../../../../../../../../assets/img/folder.png"
import GroupBar from "./GroupBar";

function Label(){
    return(
        <div className={css.labelWithMenu}>
            <div>
                Добавить в папку
            </div>
        </div>
    )
}

export function GroupTool({...props}: HTMLAttributes<HTMLDivElement>){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        setIsOpen(true); // Показываем панель
    };

    const handleMouseLeave = () => {
        setIsOpen(false); // Скрываем панель
    };

    return(
        <>
            <ListToolBase
                ref={ref}
                srcImg={imageFolder} 
                label={<Label/>} 
                {...props}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
            /> 
            {
                isOpen && 
                <GroupBar
                    refLeftEl={ref}
                    isOpen={isOpen}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                />
            }
        </>
    )
}