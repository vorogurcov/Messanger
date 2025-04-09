import { ReactNode, useState } from "react";
import Menu from "../../pages/Home/components/buttons/menu/menu";
import ModalBase from "../modalBase/modalBase";

import css from "./css.module.scss"
import Preview from "./components/Preview/Preview";
import profileActive from "../../../../assets/img/profileActive.png"
import profilePassive from "../../../../assets/img/profilePassive.png"
import zamokActive from "../../../../assets/img/zamokActive.png"
import zamokPassive from "../../../../assets/img/zamokPassive.png"
import FieldPanel from "./components/Field/Field";
import Profile from "./components/Profile/Profile";
import UpdateCredentials from "./components/UpdateCredentials/UpdateCredentials";

const initialFields = [
    {id: 0, label: "Мой профиль", imgesSrc: {active: profileActive, notActive: profilePassive}, active: false, node: <Profile/>},
    {id: 1, label: "Конфиденциальность", imgesSrc: {active: zamokActive, notActive: zamokPassive}, active: false, node: <UpdateCredentials/>}
]

export default function MovableNavigatePanelModal(){
    const [isOpen, setIsOpen] = useState(false)
    const [fields, setFields] = useState(initialFields)
    const [selectedField, setSelectedField] = useState<ReactNode>(null)

    const handleClick = (id: number) => {
        setFields(fields.map(field => field.id === id ? {...field, active: true}: {...field, active: false}))
        setSelectedField(fields.find(field => field.id === id)?.node)
    }

    return(
        <>
            <Menu onClick={() => setIsOpen(true)}/>
            <ModalBase
                isOpen={isOpen}
                onRequestClose={() => { 
                    setIsOpen(false)
                    setFields(initialFields)
                    selectedField && setSelectedField(null) 
                }}
                overlayClassName={selectedField ? css.modalOverlay : undefined}
                className={selectedField ? css.modalContent : css.modal}
            >
                {selectedField ? selectedField : <>
                <Preview/> {/* может лучше мемоизовать, чтобы не нагружать сеть ту же */}
                <div>
                    {fields.map(field => 
                        <FieldPanel 
                            key={field.id} 
                            active={field.active} 
                            imgesSrc={field.imgesSrc} 
                            label={field.label} 
                            onClick={() => handleClick(field.id)}
                        />
                    )}
                </div></>}
            </ModalBase>
        </>
    )
}