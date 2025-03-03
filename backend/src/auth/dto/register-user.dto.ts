import {MinLength, MaxLength, Matches, IsNotEmpty} from 'class-validator'
export class RegisterUserDto{
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @Matches(/[^0-9]/, {
        message: 'Имя не должно быть числовой строкой',
    })

    name:string;

    @Matches(/^(7|8)[\s\-]?[489][0-9]{2}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
        message: 'Некорректный номер телефона',
    })
    phone_number:string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password:string;

}