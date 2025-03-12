import { InputHTMLAttributes } from "react"

type LabeledButton = {
    name: string
    active: boolean
}

export type LabeledButtonProps = LabeledButton & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>