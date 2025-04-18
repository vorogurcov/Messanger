import ListToolBase from "../../../../ListToolBase/ListToolBase";
import imageSrc from "../../../../../../../../../assets/img/rename.png"
import { useGroupListContext } from "../../../../../../../pages/Home/hooks/useGroupListContext";
import { useCallback } from "react";
import { PanelGroupButtons } from "../../../../../../../../entities/schemes/dto/Chat";

export default function RenameFolderTool({thisFolder}: {thisFolder: PanelGroupButtons}){
    const groups = useGroupListContext()

    const handleClick = useCallback(() => {
        groups?.handleChangeState(groups.groups.map(gr => gr.name === thisFolder.name ? {...gr, isChangeName: true} : gr))
    }, [groups, thisFolder])
    return(
        <ListToolBase srcImg={imageSrc} label="Переименовать" onClick={handleClick}/>
    )
}