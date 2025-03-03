import { InputHTMLAttributes, memo } from "react"
import AuthorizationInput from "../../UI/inputs/AuthorizationInputs/AuthorizationInput"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    keyField?: string
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

function ErrorDescription({errorName}: {errorName: string | undefined}){
  return(
    <div>
      {errorName}
    </div>
  )
}

function OneRow({keyField, callback, error, ...props}: Props)
{
  return(
    <div>
      <AuthorizationInput
        {...props}
        onChange={(e) => callback(e)} 
        placeholder={keyField}
      />
      <ErrorDescription errorName={error}/>
    </div>
  )
}

export const InputAuthorizationRow = memo(OneRow)