import { useState } from "react";
import Menu from "../../pages/Home/components/buttons/menu/menu";
import ModalBase from "../modalBase/modalBase";

import css from "./css.module.scss"
import { useNavigate } from "react-router";
import core from "../../../../core/core";

export default function MovableNavigatePanelModal(){
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    return(
        <>
            <Menu onClick={() => setIsOpen(true)}/>
            <ModalBase
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={css.modal}
            >
                <div className={css.modal_content}>
                    <button onClick={() => navigate(core.frontendEndpoints.profile)}>Профиль</button>
                </div>
            </ModalBase>
        </>
    )
}