import { useEffect, useRef, useState } from "react";

export default function useDebounce(str: string, delay: number = 1000){
    const timerRef = useRef<any>(null);
    const [result, setResult] = useState("");
    useEffect(() => {
        timerRef.current = setTimeout(() => setResult(str), delay);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [str, delay])
    return result;
}