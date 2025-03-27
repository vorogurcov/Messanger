import { HTMLAttributes, useRef, useState } from "react";
import ImageButtonBase from "../ImageButtonBase/ImageButtonBase";

import css from "./css.module.scss"
import photo from "../../../../../../assets/img/camera.png"
import deleteImg from "../../../../../../assets/img/delete.png"
import galery from "../../../../../../assets/img/galery.png"

interface RowProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc: string, 
    label: string, 
}

function Row({imgSrc, label, onClick, ...props}: RowProps){
    return(
        <div className={css.row} onClick={onClick}>
            <div className={css.rowImg} style={props.style}>
                <img src={imgSrc} alt="img" />
            </div>
            <div>
                {label}
            </div>
        </div>
    )
}

interface Props{
    handleDelete: () => void 
    handleUpload: (file: FileList | null) => void
}

export default function AddPhotoButton({handleDelete, handleUpload}: Props){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement | null>(null)

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
                        <Row imgSrc={galery} label="Файл" onClick={() => ref.current?.click()}/>
                        <Row imgSrc={deleteImg} label="Удалить" style={{height: "18px", width: "20px"}} onClick={handleDelete}/>
                        <input ref={ref} type="file" style={{display: "none"}} onChange={(e) => handleUpload(e.target.files)}/>
                    </div>
                </div>
            )}
        </div>
    )
}