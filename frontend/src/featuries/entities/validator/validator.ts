import * as Yup from "yup"
import { EmailValidationSchema, LoginValidationSchema, MobileValidationSchema, PasswordValidateSchema } from "./validateSchemas/authorizationSchemas";

export default class Validators{
    static validatePhone(phone?: string) {
        let regex = /^(7|8)[\s\-]?[489][0-9]{2}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return regex.test(phone??"");
    }

    static getEnterValidateSchema(){
        const logValidate = Yup.object().shape({
            login: LoginValidationSchema
            .test(
                'not-only-numbers',
                'Неверный номер телефона',
                value => Validators.validatePhone(value)
            )
            .test(
            'invalid-email',
            'Некорректная почта',
            (value) => {
                // Проверка на пустое значение
                if (!value) return true;
                // Если в строке есть символ '@', но это не валидный email — ошибка
                return !value.includes('@') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
            )
            .min(2, 'Минимум 2 символа')
            .max(50, 'Максимум 50 символов')
            .required("Пустое поле")
            ,
            password: PasswordValidateSchema
        })
        const emailValidate = Yup.object().shape({
            login: EmailValidationSchema,
            password: PasswordValidateSchema
        })
        const mobileValidate = Yup.object().shape({
            login: MobileValidationSchema,
            password: PasswordValidateSchema
        })
        return [logValidate, mobileValidate, emailValidate]
    }

    static getRegisterValidateSchema(){
        return [Yup.object().shape({
            login: LoginValidationSchema
                .matches(/^(?!\d+$)(?!.*@).*$/, "Логин не содержит @ и не может быть численным"),
            password: PasswordValidateSchema,
            phoneNumber: MobileValidationSchema,
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Пароли должны совпадать')
                .required('Пустое поле')
        })]
    }
}