import { useEffect, useState } from "react";
import RetryButton from "./UI/buttons/RetryButton/RetryButton";

export default function Timer({delay, label, onClick}: {delay: number, label: string, onClick: () => void}){
    const [timeLeft, setTimeLeft] = useState<number>(delay); // сек
    
    useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer);
    }, [timeLeft]);

    return(
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", height: "40px"}}>
            <b>{label}: </b>
            {timeLeft ? <b>{timeLeft}</b> : <RetryButton onClick={onClick}/>}
        </div>
    )
}