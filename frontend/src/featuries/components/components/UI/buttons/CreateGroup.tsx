import { InputHTMLAttributes } from "react";
import LabledImgButton from "./LabledImgButton/LabledImgButton";
import image from "../../../../../assets/img/createFolder.png"

export default function CreateFolderButton({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <LabledImgButton {...props} label={props.name ? props.name : "Добавить"} src={image}/>
    )
}