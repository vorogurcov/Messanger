// если меняешь, е забудь в validator внести изменения

export interface AuthorizationProp{
    login: string
    password: string
}

export const initialAuthorizationProp: AuthorizationProp = {
    login: "",
    password: ""
}

export interface RegisrationProp extends AuthorizationProp{ // mail в лич каб
    phoneNumber: string
    repeatPassword: string // важно иметь подстрроку password для type input 
}

export const initialRegisrationProp: RegisrationProp = {
    login: "",
    phoneNumber: "",
    password: "",
    repeatPassword: ""
}
