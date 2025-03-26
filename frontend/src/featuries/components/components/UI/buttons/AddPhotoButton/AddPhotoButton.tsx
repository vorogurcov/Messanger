import { InputHTMLAttributes, useState } from "react";
import ImageButtonBase from "../ImageButtonBase/ImageButtonBase";

import css from "./css.module.scss"
import photo from "../../../../../../assets/img/camera.png"

export default function AddPhotoButton({...props}: InputHTMLAttributes<HTMLInputElement>){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsOpen(true); // Показываем панель
    };

    const handleMouseLeave = () => {
        setIsOpen(false); // Скрываем панель
    };

    return(
        <div>
            <ImageButtonBase 
                src={photo} 
                style={{backgroundColor: "#006FFD", borderRadius: "50%", padding: "3px", width: "30px"}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {isOpen && (
                <div 
                    className={css.inner}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={css.content}>
                        <div>hello</div>
                        <div>hello</div>
                        <div>hello</div>
                    </div>
                </div>
            )}
        </div>
    )
}