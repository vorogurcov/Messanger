import React, { memo, useRef, useState } from "react";
import ApiQuery from "../../../api/query";
import ErrorMessage from "../../components/stylingString/errorMessage";
import ModalBase from "../modalBase/modalBase";
import css from "./css.module.scss"
import AuthorizationBatton from "../../components/UI/buttons/AuthorizationButtons/AuthorizationButton";
import LoadingComponent from "../../components/LoadingComponent";

function InputToNumber({
  index,
  value,
  setValue,
  refs,
}: {
  index: number;
  value: string;
  setValue: (index: number, val: string) => void;
  refs: React.RefObject<HTMLInputElement | null>[];
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Берём только первый символ, игнорируем остальное
    const newValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    setValue(index, newValue);

    // Если ввели символ, переключаемся на следующую ячейку
    if (newValue && refs[index + 1]) refs[index + 1].current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!value && refs[index - 1]) {
        // Если ячейка пуста, переходим к предыдущей ячейке
        refs[index - 1].current?.focus();
      } else if (value) {
        // Если ячейка заполнена, очищаем её
        setValue(index, "");
      }
    } else if (e.key === "ArrowLeft" && refs[index - 1]) {
      // Переход на предыдущую ячейку на стрелку влево
      refs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && refs[index + 1]) {
      // Переход на следующую ячейку на стрелку вправо
      refs[index + 1].current?.focus();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={refs[index]}
      className={css.input}
    />
  );
}

const MemoizedInput = memo(InputToNumber)

const ConfirmCode = ({userId, callbackSubmit}: {userId: string, callbackSubmit: () => void}) => {
  const size = 6; // Количество ячеек ввода
  const [values, setValues] = useState<string[]>(Array(size).fill("")); // Данные для каждой ячейки
  const [apiError, setApiError] = useState("")
  const refs = useRef(Array.from({ length: size }, () => React.createRef<HTMLInputElement>())).current;
  const [isLoading, setIsLoading] = useState(false)

  const setValue = (index: number, val: string) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues); // Обновляем состояние
  };

  const checkValues = () => {
    for (const el of values)
        if (!el)
            return false
    return true
  }

  const handleSubmit = () => {
    if (checkValues()){
      setIsLoading(true)
      ApiQuery.confirmCode(userId, values.join(""))
      .then(() => callbackSubmit())
      .catch((error) => {
        console.log(error, "err")
        setApiError("Неверный код")
      })
      .finally(() => setIsLoading(false))
    }
  }

  return (
    <div>
      <h2>Введите код</h2>
      <h3>Код отправлен вам на почту</h3>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0px 10px 0px" }}>
        {values.map((value, index) => (
          <MemoizedInput
            key={index}
            index={index}
            value={value}
            setValue={setValue}
            refs={refs}
          />
        ))}
      </div>
      <div style={{position: "relative", display: 'flex', justifyContent: "center", width: "100%", marginTop: "20px"}}>
        <LoadingComponent loading={isLoading}>
          <div>
            <AuthorizationBatton
              onClick={handleSubmit}
              style={{display: checkValues() ? "" : "none", width: "150px"}}
            >
              Подтвердить код
            </AuthorizationBatton>
            <ErrorMessage>{apiError}</ErrorMessage>
          </div>
        </LoadingComponent>
      </div>
    </div>
  );
};

function VerifyCodeModal({isOpen, setIsOpen, id, callbackSubmit}: 
{isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, id: string, callbackSubmit: () => void}){
    return(
        <ModalBase 
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName={css.modalOverlay}
            className={css.modalContent}
        >
            <div className={css.wrapper}>
                <ConfirmCode userId={id} callbackSubmit={callbackSubmit}/>
            </div>
        </ModalBase>
    )
}

export default VerifyCodeModal;
