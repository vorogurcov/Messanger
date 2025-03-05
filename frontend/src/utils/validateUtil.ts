import * as Yup from 'yup'
import createErrorObjFromValidationError from '../featuries/entities/validator/validateSchemas/createErrorObjFromValidationError'
import { AuthorizationProp } from '../featuries/entities/schemes/dto/Authorization'

export const validateUtil = async<T extends AuthorizationProp> (schemas: Yup.ObjectSchema<T>[], errorsKeys: string[], data: T) => {
    let newErrors: T[] = []
    for (let schema of schemas){
        try{
            await schema.validate(data, { abortEarly: false })
        } catch (error){
            if (error instanceof Yup.ValidationError) {
                const newError = createErrorObjFromValidationError<T>(errorsKeys, error.inner)
                if (newError)
                    newErrors = [...newErrors, newError]
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    if (newErrors.length === schemas.length) throw newErrors
}