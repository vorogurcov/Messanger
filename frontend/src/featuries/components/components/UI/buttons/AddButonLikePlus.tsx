import { InputHTMLAttributes } from "react";
import LabledImgButton from "./LabledImgButton/LabledImgButton";
import image from "../../../../../assets/img/add.png"

export default function AddButonLikePlus({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <LabledImgButton {...props} label={props.name ? props.name : "Добавить"} src={image}/>
    )
}