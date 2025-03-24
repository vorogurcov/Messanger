import React, { useRef, useState, useEffect } from "react";
import ApiQuery from "../../../api/query";
import { useNavigate, useParams } from "react-router";
import core from "../../../../core/core";
import ErrorMessage from "../../components/stylingString/errorMessage";

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
      style={{
        width: "40px",
        margin: "10px",
        textAlign: "center",
        fontSize: "20px",
      }}
    />
  );
}

const ConfirmCode = () => {
  const size = 6; // Количество ячеек ввода
  const [values, setValues] = useState<string[]>(Array(size).fill("")); // Данные для каждой ячейки
  const [apiError, setApiError] = useState("")
  const navigate = useNavigate()
  const userId = useParams()
  const refs = useRef(Array.from({ length: size }, () => React.createRef<HTMLInputElement>())).current;

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
    if (checkValues() && userId.id){
      ApiQuery.confirmCode(userId.id, values.join())
      .then(() => navigate(core.frontendEndpoints.login))
      .catch((error) => {
        console.log(error, "err")
        setApiError("Неверный код")
      })
    }
  }

  return (
    <div>
      <h1>Введите код</h1>
      <h3>Код отправлен вам на почту</h3>
      <div style={{ display: "flex" }}>
        {values.map((value, index) => (
          <InputToNumber
            key={index}
            index={index}
            value={value}
            setValue={setValue}
            refs={refs}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", display: checkValues() ? "" : "none"}}
      >
        Подтвердить код
      </button>
      <div>
        <ErrorMessage>{apiError}</ErrorMessage>
      </div>
    </div>
  );
};

export default ConfirmCode;
