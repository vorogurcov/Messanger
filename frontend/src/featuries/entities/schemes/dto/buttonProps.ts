import { InputHTMLAttributes, ReactNode } from "react"

type LabeledButton = {
    name: ReactNode
    active: boolean
}

export type LabeledButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'> & LabeledButton 