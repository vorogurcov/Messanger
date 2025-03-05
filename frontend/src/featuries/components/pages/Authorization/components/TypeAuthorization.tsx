import { ReactNode } from "react";

export default function TypeAuthorization({children}: {children: ReactNode}){
    return(
        <div style={{fontSize: "200%"}}>
            <h2 style={{marginTop: "0px"}}>{children}</h2>
        </div>
    )
}