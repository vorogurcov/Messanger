import ReactModal from "react-modal";
import css from "./css.module.scss"

export default function ModalBase({...props}: ReactModal.Props){
    return(
        <ReactModal 
            {...props}
            overlayClassName={props.overlayClassName??css.overlay}
        >
            {props.children}
        </ReactModal>
    )
}