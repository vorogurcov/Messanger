import { InputHTMLAttributes, memo, useRef, useState } from "react"
import AuthorizationInput from "../../UI/inputs/AuthorizationInputs/AuthorizationInput"

import css from "./authRow.module.css"

import ErrorMessage from "../../stylingString/errorMessage"
import { HideButton, ShowButton } from "./components/buttons"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  label?: string
  keyField?: string
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string | undefined
}

function OneRow({keyField, callback, error, ...props}: Props)
{
  const refType = useRef(props.type)
  const [type, setType] = useState(props.type??"text")
  return(
    <div style={props.style} className={css.wrapper}>
      <div style={{fontSize: "70%"}}>
        <b>{props.label}</b>
      </div>
      <div className={css.container}>
        <AuthorizationInput
          {...props}
          style={{paddingRight: "10px"}}
          type={type}
          onChange={(e) => callback(e)} 
          placeholder={props.placeholder}
        />
        {type === "password" ? 
        <ShowButton className={css.toggle} onClick={() => setType("text")}/> :
        refType.current === "password" && <HideButton className={css.toggle} onClick={() => setType("password")}/>
        }
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  )
}

export const InputAuthorizationRow = memo(OneRow)