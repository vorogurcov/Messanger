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
import VerifyCodeModal from "../../../modals/verifyCodeModal/VerifyCodeModal";
import RegistrationSVGcomp from "../../../components/SVGcomp/registrationSVGcomp/registrationSVGcomp";
import { useNavigate } from "react-router";
import core from "../../../../../core/core";
import LoadingComponent from "../../../components/LoadingComponent";

const schemas = Validators.getRegisterValidateSchema()
const errorsKeys = Object.keys(initialRegisrationProp)

const SubmitionMemoized = memo(AuthorizationBatton)

export default function Registration(){
    const [data, setData] = useState<RegisrationProp>(initialRegisrationProp)
    const [errors, setErrors] = useState<RegisrationProp>(initialRegisrationProp)
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [responseId, setResponseId] = useState("")
    const navigate = useNavigate()

    const submit = () => {
        validateUtil<RegisrationProp>(schemas, errorsKeys, data)
        .then(() => { // можно вынести отдельно
            setErrors(initialRegisrationProp)
            setIsLoading(true)
            ApiQuery.register(data)
            .then(({data}) => {
                setResponseId(data.user.id)
                setModalOpen(true)
            })
            .catch((error) => {
                if (error.status === 409)
                    setApiError("Такой пользователь существует")
                else setApiError("Неизвестная ошибка (")
            })
            .finally(() => setIsLoading(false))
        })
        .catch((errors) => setErrors(errors[0]))
    }

    return(
        <>
        <RegistrationSVGcomp/>
        <AuthorizationBaseForm isEnter={false}>
            <TypeAuthorization>Регистрация</TypeAuthorization>
            <LoadingComponent loading={isLoading}>
                {Object.keys(data).map(
                    (key) =>
                    <InputAuthorizationRow
                        key={key} 
                        label={LabelRegistration[key as keyof typeof LabelRegistration]}
                        type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
                        keyField={key} 
                        placeholder={PlaceholderRegistration[key as keyof typeof PlaceholderRegistration]}
                        value={data[key as keyof typeof data]} 
                        onChange={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
                        error={errors[key as keyof typeof errors]}
                    />
                )}
                <SubmitionMemoized 
                    onClick={submit} 
                    style={{marginTop: "20px", backgroundColor: isLoading ? "#0055C3" : undefined}} 
                    disabled={isLoading}
                >
                        Зарегистрироваться
                </SubmitionMemoized>
                <WayAuthorization nameLink="Войти" nameQuestion="Есть аккаунт?" callback={() => navigate(core.frontendEndpoints.login)}/>
                <div>
                    <ErrorMessage>{apiError}</ErrorMessage>
                </div>
                <VerifyCodeModal 
                    isOpen={modalOpen && responseId.length !== 0} 
                    setIsOpen={setModalOpen} 
                    id={responseId} 
                    callbackSubmit={() => navigate(core.frontendEndpoints.login)}
                />
            </LoadingComponent>
        </AuthorizationBaseForm>
        </>
    )
}