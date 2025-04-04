import { useEffect, useState } from "react";
import * as Yup from 'yup'
import useDebounce from "../../../../../../../hooks/useDebounce";

import correct from "../../../../../../../assets/img/correct.png"
import uncorrect from "../../../../../../../assets/img/uncorrect.png"
import { ChangeValueProps } from "../types";

export default function useValidateUpdateCridentials(
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    schema: Yup.StringSchema,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<ChangeValueProps>>,
    canBeEmpty: boolean = true
) : [string, string | undefined]{
    const [resultValidateImg, setResultValidateImg] = useState<string>()
    const [error, setError] = useState("")
    const validationValue = useDebounce(value, 700)

    useEffect(() => {
        console.log(value)
        setIsLoading(true)
        schema.validate(validationValue, {abortEarly: false})
        .then(() => {
            setResultValidateImg(correct)
            setValue({value: validationValue, isCorrect: true})
            setError("")
        })
        .catch((error) => {
            if (validationValue || !canBeEmpty){ // если пользователь не начал что-то вводить, то нет смысла показывать ошибку
                setResultValidateImg(uncorrect)
                setValue({value: validationValue, isCorrect: false})
                if (error instanceof Yup.ValidationError){
                    setError(error.inner[error.inner.length - 1].message)
                }
            }
            else if (canBeEmpty){
                setValue({value: validationValue, isCorrect: true})
                setResultValidateImg(correct)
                setError("")
            }
        })
        .finally(() => setIsLoading(false))
    }, [validationValue, canBeEmpty])

    return [error, resultValidateImg]
}