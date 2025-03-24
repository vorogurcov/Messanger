import { memo, useState } from "react";
import AuthorizationBaseForm from "../../../components/Authorization/AuthorizationBaseForm/Authorization";
import { initialRegisrationProp, RegisrationProp } from "../../../../entities/schemes/dto/Authorization";
import { InputAuthorizationRow } from "../../../components/Authorization/AuthorizationRow/AuthorizationRow";
import AuthorizationBatton from "../../../components/UI/buttons/AuthorizationButtons/AuthorizationButton";
import { validateUtil } from "../../../../../utils/validateUtil";
import Validators from "../../../../entities/validator/validator";
import ApiQuery from "../../../../api/query";
import TypeAuthorization from "../components/TypeAuthorization";
import { LabelRegistration, PlaceholderRegistration } from "../../../../entities/schemes/enums/convertObjKeysToSmth";
import WayAuthorization from "../components/wayAuthUnderSubmit";
import ErrorMessage from "../../../components/stylingString/errorMessage";
import { useNavigate } from "react-router";

const schemas = Validators.getRegisterValidateSchema()
const errorsKeys = Object.keys(initialRegisrationProp)

const SubmitionMemoized = memo(AuthorizationBatton)

export default function Registration({callbackToggle}: {callbackToggle: () => void}){
    const [data, setData] = useState<RegisrationProp>(initialRegisrationProp)
    const [errors, setErrors] = useState<RegisrationProp>(initialRegisrationProp)
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [apiError, setApiError] = useState("")

    const navigate = useNavigate()

    const submit = () => {
        setIsDisabledButton(true)
        validateUtil<RegisrationProp>(schemas, errorsKeys, data).then(() => { // можно вынести отдельно
            setErrors(initialRegisrationProp)
            ApiQuery.register(data)
            .then(({data}) => navigate(`/verify/${data.user.id}`))
            .catch((error) => {
                if (error.status === 409)
                    setApiError("Такой пользователь существует")
                else setApiError("Неизвестная ошибка (")
        })
        })
        .catch((errors) => setErrors(errors[0]))
        .finally(() => setIsDisabledButton(false))
      }

    return(
        <AuthorizationBaseForm isEnter={false}>
            <TypeAuthorization>Регистрация</TypeAuthorization>
            {Object.keys(data).map(
                (key) =>
                <InputAuthorizationRow
                    key={key} 
                    label={LabelRegistration[key as keyof typeof LabelRegistration]}
                    type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
                    keyField={key} 
                    placeholder={PlaceholderRegistration[key as keyof typeof PlaceholderRegistration]}
                    value={data[key as keyof typeof data]} 
                    callback={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
                    error={errors[key as keyof typeof errors]}
                />
            )}
            <SubmitionMemoized onClick={submit} style={{marginTop: "20px", backgroundColor: isDisabledButton ? "#0055C3" : undefined}} disabled={isDisabledButton}>Зарегистрироваться</SubmitionMemoized>
            <WayAuthorization nameLink="Войти" nameQuestion="Есть аккаунт?" callback={callbackToggle}/>
            <div>
                <ErrorMessage>{apiError}</ErrorMessage>
            </div>  
        </AuthorizationBaseForm>
    )
}