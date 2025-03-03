import { memo, useState } from "react";
import AuthorizationBaseForm from "../../../components/lowLevel/Authorization/AuthorizationBaseForm/Authorization";
import { initialRegisrationProp, RegisrationProp } from "../../../../entities/schemes/dto/Authorization";
import { InputAuthorizationRow } from "../../../components/lowLevel/Authorization/AuthorizationRow/AuthorizationRow";
import AuthorizationBatton from "../../../components/lowLevel/UI/buttons/AuthorizationButtons/AuthorizationButton";
import { validateUtil } from "../../../../../utils/validateUtil";
import Validators from "../../../../entities/validator/validator";
import ApiQuery from "../../../../api/query";

const schemas = Validators.getRegisterValidateSchema()
const errorsKeys = Object.keys(initialRegisrationProp)

const SubmitionMemoized = memo(AuthorizationBatton)

export default function Registration(){
    const [data, setData] = useState<RegisrationProp>(initialRegisrationProp)
    const [errors, setErrors] = useState<RegisrationProp>(initialRegisrationProp)

    const submit = () => {
        validateUtil<RegisrationProp>(schemas, errorsKeys, data).then(() => {
          setErrors(initialRegisrationProp)
          ApiQuery.register(data)
        })
        .catch((errors) => setErrors(errors[0]))
      }

    return(
        <AuthorizationBaseForm>
            {Object.keys(data).map(
                (key) =>
                <InputAuthorizationRow
                    key={key} 
                    type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
                    keyField={key} 
                    value={data[key as keyof typeof data]} 
                    callback={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
                    error={errors[key as keyof typeof errors]}
                />
            )}
            <SubmitionMemoized onClick={submit}>Зарегистрироваться</SubmitionMemoized>
        </AuthorizationBaseForm>
    )
}