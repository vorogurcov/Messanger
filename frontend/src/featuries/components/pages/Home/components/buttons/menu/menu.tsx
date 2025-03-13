import ImageButtonBase from "../../../../../components/UI/buttons/ImageButtonBase/ImageButtonBase";
import menu from "../../../../../../../assets/img/menu.png"
import { InputHTMLAttributes } from "react";

import css from "./css.module.scss"

export default function Menu({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <ImageButtonBase src={menu} {...props}/>
    )
}