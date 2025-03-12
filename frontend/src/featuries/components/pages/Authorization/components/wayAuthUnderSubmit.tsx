import BlueLink from "../../../components/UI/links/blueLink/BlueLink";

interface Props{
    nameLink: string,
    nameQuestion: string
    callback: () => void
}

export default function WayAuthorization({nameLink, nameQuestion, callback}: Props){
    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <div style={{fontSize: "70%", color: "#AFAFAF"}}>{nameQuestion}</div>
            <BlueLink style={{marginLeft: "5px"}} onClick={callback}>{nameLink}</BlueLink>
        </div>
    )
}