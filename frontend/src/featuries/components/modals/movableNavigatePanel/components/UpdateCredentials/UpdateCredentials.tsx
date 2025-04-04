import { ReactNode, useState } from "react";
import LoadingComponent from "../../../../components/LoadingComponent";
import { InputAuthorizationRow } from "../../../../components/Authorization/AuthorizationRow/AuthorizationRow";
import { EmailValidationSchema, PasswordValidateSchema } from "../../../../../entities/validator/validateSchemas/authorizationSchemas";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/useStore";
import { UserLK } from "../../../../../entities/schemes/dto/User";
import { UserSliceManager } from "../../../../../entities/store/featuries/userSlice";
import css from "./css.module.scss"
import { ChangeValueProps } from "./types";
import useValidateUpdateCridentials from "./hooks/useValidate";
import * as Yup from 'yup'
import AuthorizationBatton from "../../../../components/UI/buttons/AuthorizationButtons/AuthorizationButton";

function ValidationRow({children, imgSrc, isLoading}: {children: ReactNode, imgSrc: string | undefined, isLoading: boolean}){
    return(
        <div className={css.inputEmail}>
            {children}
            <div className={css.wrapperCorrect}>
                <LoadingComponent loading={isLoading} style={{width: "15px", height: "15px"}}>
                    {imgSrc && <img src={imgSrc} alt="" />} {/* если пользователь не начал что-то вводить, то нет смысла показывать ошибку */}
                </LoadingComponent>
            </div>
        </div>
    )
}

function EmailUpdate({oldEmail, newEmail, setNewEmail}: {oldEmail?: string, newEmail: ChangeValueProps, setNewEmail: React.Dispatch<React.SetStateAction<ChangeValueProps>>}){
    const [isLoading, setIsLoading] = useState(false)
    const [error, resultValidateImg] = useValidateUpdateCridentials(setIsLoading, EmailValidationSchema, newEmail.value, setNewEmail)

    return(
        <div className={css.wrapperEmail}>
            <div style={{color: "#AFAFAF", fontSize: "90%"}}>
                {oldEmail ? <span>{oldEmail}</span> : <span>Место для вашей почты :)</span>}
            </div>
            <ValidationRow isLoading={isLoading} imgSrc={resultValidateImg}>
                <InputAuthorizationRow 
                    value={newEmail.value} 
                    onChange={(e) => {
                        setIsLoading(true);
                        setNewEmail({...newEmail, value: e.target.value});
                    }}
                    style={{flex: 1}}
                    error={error}
                />
            </ValidationRow>
        </div>
    )
}

function PasswUpdateRow({value, setValue, schema, placeholder, canBeEmpty = true}: {
    value: ChangeValueProps, 
    setValue: React.Dispatch<React.SetStateAction<ChangeValueProps>>, 
    schema: Yup.StringSchema,
    canBeEmpty?: boolean,
    placeholder?: string,
}){
    const [isLoading, setIsLoading] = useState(false)
    const [error, resultValidateImg] = useValidateUpdateCridentials(setIsLoading, schema, value.value, setValue, canBeEmpty)
    return(
        <ValidationRow isLoading={isLoading} imgSrc={resultValidateImg}>
            <InputAuthorizationRow 
                value={value.value} 
                type="password" 
                placeholder={placeholder} 
                onChange={(e) => {
                    setIsLoading(true);
                    setValue({...value, value: e.target.value});
                }}
                style={{flex: 1}}
                error={error}
            />
        </ValidationRow>
    )
    
}

function PasswordUpdate({password, setPassword, repeat, setRepeat}: {
    password: ChangeValueProps, 
    setPassword: React.Dispatch<React.SetStateAction<ChangeValueProps>>,
    repeat: ChangeValueProps, 
    setRepeat: React.Dispatch<React.SetStateAction<ChangeValueProps>>
}){
    const RepeatSchema = 
        Yup.string().test(
          'repeat',
          'Пароли не совпадают',
          value => value === password.value
        )
        .required("Пустое поле")
    return(
        <div className={css.wrapperEmail}>
            <PasswUpdateRow value={password} schema={PasswordValidateSchema} setValue={setPassword} placeholder="Введите новый пароль"/>
            <PasswUpdateRow value={repeat} schema={RepeatSchema} setValue={setRepeat} placeholder="Повторите новый пароль" canBeEmpty={!password.value}/>
        </div>
    )
}


export default function UpdateCredentials(){
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState<ChangeValueProps>({value: "", isCorrect: false})
    const [repeatPassw, setRepeatPassw] = useState<ChangeValueProps>({value: "", isCorrect: false})
    const [email, setEmail] = useState<ChangeValueProps>({value: "", isCorrect: false})

    const dispatch = useAppDispatch()
    const user: UserLK = useAppSelector(UserSliceManager.selectors.selectUser)

    const checkValid = () => {
        return !!((password.isCorrect && repeatPassw.isCorrect || !password.value) && (email.isCorrect || !email.value) && (email.value || password.value)) // если поле пустое, то оно просто не изменилось  
    }

    const handleSubmit = () => {
        if (checkValid()){
            alert("api")
        }
    }
    return(
        <div className={css.wrapper}>
            <div className={css.head}>
                <span style={{display: "flex", justifyContent: "center", fontSize: "140%"}}><b>Обновление данных аккаунта</b></span>
            </div>
            <LoadingComponent loading={isLoading}>
                <div className={css.name}>
                    <h3>Почта</h3>
                </div>
                <EmailUpdate oldEmail={user.email} newEmail={email} setNewEmail={setEmail}/>
                <div className={css.name}>
                    <h3>Пароль</h3>
                </div>
                <PasswordUpdate password={password} setPassword={setPassword} repeat={repeatPassw} setRepeat={setRepeatPassw}/>
                <div style={{position: "absolute", bottom: 0, width: "100%", padding: "0px 160px 60px 0px"}}> {/*см стили MovablenavPan */}
                    <AuthorizationBatton onClick={handleSubmit} disabled={!checkValid()}>Сохранить изменения</AuthorizationBatton>
                </div>
            </LoadingComponent>
        </div>
    )
}