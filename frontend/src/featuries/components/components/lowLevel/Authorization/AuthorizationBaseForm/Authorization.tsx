import { ReactNode } from "react"

export default function AuthorizationBaseForm({children}: {children: ReactNode}){
    return(
        <div>
            {children}
        </div>
    )
}