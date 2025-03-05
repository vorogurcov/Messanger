import { initialRegisrationProp } from "../dto/Authorization"; // не удалая, пусть для удобства перехода

export enum LabelRegistration{ // совпадать с regProps должен 
    login =  "Имя",
    phoneNumber = "Телефон",
    password = "Придумайте пароль",
    repeatPassword = "Повторите пароль"
}

export enum PlaceholderRegistration{ // совпадать с regProps должен
    login =  "Иван",
    phoneNumber = "7 999 999 99 99",
    password = "******",
    repeatPassword = "******"
}

export enum PlaceholderEnter{ // совпадать с regProps должен
    login =  "Эл.почта / логин / номер телефона ",
    password = "Пароль"
}