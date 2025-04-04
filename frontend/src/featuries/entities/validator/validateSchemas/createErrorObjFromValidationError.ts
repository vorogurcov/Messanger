import * as Yup from 'yup';

//
export default function createErrorObjFromValidationError<T>(keys: string[], errors: Yup.ValidationError[]): T | null{
    let returnError = null
    for (const error of errors){
        if (!returnError)
            returnError = {}
        if (error.path && keys.find(key => key === error.path))
            (returnError as any)[error.path] = error.message
    }
    for (const key of keys)
        if (!(returnError as any)[key])
            (returnError as any)[key] = ""
    return returnError as T | null
}