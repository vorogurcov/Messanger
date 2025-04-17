import { InputHTMLAttributes, ReactNode } from "react"

type LabeledButton = {
    name: ReactNode
    active: boolean
}

export type LabeledButtonProps = LabeledButton & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>