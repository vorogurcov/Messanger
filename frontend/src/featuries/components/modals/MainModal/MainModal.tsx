import ModalBase from "../modalBase/modalBase";
import css from "./css.module.scss"

export default function MainModal({...props}: ReactModal.Props){
    return(
        <ModalBase
            {...props}
            isOpen={props.isOpen}
            overlayClassName={props.overlayClassName ? props.overlayClassName : css.modalOverlay}
            className={props.className ? props.className : css.modalContent}
        >
            {props.children}
        </ModalBase>
    )
}