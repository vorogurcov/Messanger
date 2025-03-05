import * as Yup from 'yup'
import Validators from '../validator';

export const LoginValidationSchema = Yup.string()
  .min(2, 'Минимум 2 символа')
  .max(50, 'Максимум 50 символов')
  .required("Пустое поле")

export const EmailValidationSchema = 
  Yup.string()
    .email("Некорректная почта")
    .required("Пустое поле");

export const MobileValidationSchema = 
  Yup.string().test(
      'mobile',
      'Некорректный телефон',
      value => Validators.validatePhone(value)
    )
    .required('Пустое поле')

export const PasswordValidateSchema = 
  Yup.string()
  .min(6, "Минимум 6 символов")
  .max(50, "Максимум 50 символов")
  .required('Пустое поле')