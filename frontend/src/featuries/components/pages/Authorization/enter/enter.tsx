import { initialAuthorizationProp, AuthorizationProp } from '../../../../entities/schemes/dto/Authorization';
import { memo, useState } from 'react';
import AuthorizationBaseForm from '../../../components/lowLevel/Authorization/AuthorizationBaseForm/Authorization';
import ApiQuery from '../../../../api/query';
import AuthorizationBatton from '../../../components/lowLevel/UI/buttons/AuthorizationButtons/AuthorizationButton';
import { InputAuthorizationRow } from '../../../components/lowLevel/Authorization/AuthorizationRow/AuthorizationRow';
import Validators from '../../../../entities/validator/validator';
import { validateUtil } from '../../../../../utils/validateUtil';
import TypeAuthorization from '../components/TypeAuthorization';
import BlueLink from '../../../components/lowLevel/UI/links/blueLink/BlueLink';
import { PlaceholderEnter } from '../../../../entities/schemes/enums/convertObjKeysToSmth';
import WayAuthorization from '../components/wayAuthUnderSubmit';

const schemas = Validators.getEnterValidateSchema()
const errorsKeys = Object.keys(initialAuthorizationProp)

const SubmitionMemoized = memo(AuthorizationBatton)
 
export const EnterForm = ({callbackToggle}: {callbackToggle: () => void}) => {
  const [data, setData] = useState<AuthorizationProp>(initialAuthorizationProp)
  const [errors, setErrors] = useState<AuthorizationProp>(initialAuthorizationProp)
  const [isDisabledButton, setIsDisabledButton] = useState(false)

  const submit = () => {
    setIsDisabledButton(true)
    validateUtil<AuthorizationProp>(schemas, errorsKeys, data).then(() => {
      setErrors(initialAuthorizationProp)
      ApiQuery.enter(data)
    })
    .catch((errors) => setErrors(errors[0]))
    .finally(() => setIsDisabledButton(false))
  } // realese api

  return(
    <AuthorizationBaseForm isEnter={true} style={{ minWidth: "300px"}}>
      <TypeAuthorization>Вход</TypeAuthorization>
      {Object.keys(data).map(
        (key) =>
        <InputAuthorizationRow 
          key={key} 
          placeholder={PlaceholderEnter[key as keyof typeof PlaceholderEnter]}
          type={key.toLowerCase().indexOf("password") !== -1 ? "password" : "text"}
          keyField={key} 
          value={data[key as keyof typeof data]} 
          callback={(e) => setData((prev) => ({...prev, [key]: e.target.value}))} 
          error={errors[key as keyof typeof errors]}
        />
      )}
      <div style={{margin: "10px 0px 15px 0px"}}>
        <BlueLink>Забыли пароль?</BlueLink>
      </div>
      <SubmitionMemoized onClick={submit} style={{backgroundColor: isDisabledButton ? "#0055C3" : undefined}} disabled={isDisabledButton}>
        Войти
      </SubmitionMemoized>
      <WayAuthorization nameLink="Зарегистрироваться" nameQuestion="Нет аккаунта?" callback={callbackToggle}/>      
    </AuthorizationBaseForm>
  )
}