import folder from "../../../../../../assets/img/folder.png"
import filledFolder from "../../../../../../assets/img/filledFolder.png"
import LabledImgButton from "../../../../components/UI/buttons/LabledImgButton/LabledImgButton";
import { LabeledButtonProps } from "../../../../../entities/schemes/dto/buttonProps";

export default function FolderButton({active, name: label, ...props}: LabeledButtonProps){
    return(
        <LabledImgButton src={active ? filledFolder : folder} label={label} {...props}/>
    )
}