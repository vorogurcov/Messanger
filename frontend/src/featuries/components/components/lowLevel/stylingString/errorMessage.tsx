import { HTMLAttributes } from "react";

export default function ErrorMessage({children}: HTMLAttributes<HTMLDivElement>){
    return(
        <div style={{color: "red", fontSize: "70%"}}>
            {children}
        </div>
    )
}