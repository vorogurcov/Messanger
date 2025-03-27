import { initialRegisrationProp } from "../dto/Authorization"; // не удалая, пусть для удобства перехода

export enum LabelRegistration{ // совпадать с regProps должен 
    login =  "Логин",
    phoneNumber = "Телефон",
    password = "Придумайте пароль",
    repeatPassword = "Повторите пароль",
    email = "Почта"
}

export enum PlaceholderRegistration{ // совпадать с regProps должен
    login =  "Ivan2020",
    phoneNumber = "7 999 999 99 99",
    password = "******",
    repeatPassword = "******",
    email = "ivan@example.com"
}

export enum PlaceholderEnter{ // совпадать с regProps должен
    login =  "Эл.почта / логин / номер телефона ",
    password = "Пароль"
}

export enum LabelUserLK{
    userName = "Имя",
    bio = "О себе",
    birthDate = "Дата рождения"
}

export enum PlaceholderUserLK{
    userName = "Имя",
    bio = "Лоблю котиков",
    birthDate = "18.07.1924"
}