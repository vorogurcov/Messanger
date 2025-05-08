import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import ApiQuery from "../featuries/api/query";
import { GenericAbortSignal } from "axios";

export default function useSearch<T>(
    str: string, 
    methodApi: (searchStr: string, signal?: GenericAbortSignal | undefined) => Promise<T[]>
){
    const searchStr = useDebounce(str, 500)
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        if (searchStr.length === 0)
            setData([])
        else{
            setIsloading(true)
            methodApi.call(ApiQuery, searchStr, controller.signal)
            .then(data => setData(data))
            .finally(() => setIsloading(false))
        }
        return () => controller.abort()
    }, [searchStr, methodApi])

    return {data, isLoading}
}