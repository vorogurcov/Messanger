import { initialAuthorizationProp, AuthorizationProp } from '../../../../entities/schemes/dto/Authorization';
import { memo, useState } from 'react';
import AuthorizationBaseForm from '../../../components/lowLevel/Authorization/AuthorizationBaseForm/Authorization';
import ApiQuery from '../../../../api/query';
import AuthorizationBatton from '../../../components/lowLevel/UI/buttons/AuthorizationButtons/AuthorizationButton';
import { InputAuthorizationRow } from '../../../components/lowLevel/Authorization/AuthorizationRow/AuthorizationRow';
import Validators from '../../../../entities/validator/validator';
import { validateUtil } from '../../../../../utils/validateUtil';

const schemas = Validators.getEnterValidateSchema()
const errorsKeys = Object.keys(initialAuthorizationProp)

const SubmitionMemoized = memo(AuthorizationBatton)
 
export const EnterForm = () => {
  const [data, setData] = useState<AuthorizationProp>(initialAuthorizationProp)
  const [errors, setErrors] = useState<AuthorizationProp>(initialAuthorizationProp)

  const submit = () => {
    validateUtil<AuthorizationProp>(schemas, errorsKeys, data).then(() => {
      setErrors(initialAuthorizationProp)
      ApiQuery.enter(data)
    })
    .catch((errors) => setErrors(errors[0]))
  } // realese api

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
      <SubmitionMemoized onClick={submit}>Войти</SubmitionMemoized>
    </AuthorizationBaseForm>
  )
}