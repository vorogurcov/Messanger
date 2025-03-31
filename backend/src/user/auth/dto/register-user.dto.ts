import { MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';
export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @Matches(/[^0-9]/, {
        message: 'Имя не должно быть числовой строкой',
    })
    login: string;

    @Matches(
        /^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$))$/,
        {
            message: 'Некорректная почта',
        },
    )
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}
