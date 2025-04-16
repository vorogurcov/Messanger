import css from "./css.module.scss"
import { GroupTool } from "./components/Tools/GroupTool/GroupTool";
import DeleteTool from "./components/Tools/DeleteTool";

export default function ListTools(){
    return(
        <div className={css.wrapWrapper}>
            <div className={css.wrapper}>
                <GroupTool/>
                <DeleteTool/>

            </div>
        </div>
    )
}