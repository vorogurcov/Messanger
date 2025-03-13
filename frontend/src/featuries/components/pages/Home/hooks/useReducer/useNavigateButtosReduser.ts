import { useReducer } from "react";
import { PanelButtons } from "../../../../../entities/schemes/dto/Chat";

type FormAction =
    | { type: "UPDATE_FIELD"; id: number}
    | { type: "RESET_FORM" }
    | {type: "ADD_FIELDS"; value: PanelButtons[]}
    | {type: "CHOOSE"; id: number}

const defaultValue: PanelButtons[] = [{id: -1, active: true, name: "Все чаты"}];

function formReducer(state: PanelButtons[], action: FormAction): PanelButtons[] {
  switch (action.type) {
    case "UPDATE_FIELD":
        return state.map(button => action.id === button.id ? {...button, active: true} : {...button, active: false});
    case "RESET_FORM":
        return defaultValue;
    case "ADD_FIELDS":
        return [...state, ...action.value]
    case "CHOOSE":
        return state.map(but => but.id === action.id ? {...but, active: true} : but.active ? {...but, active: false} : but)
    default:
      throw new Error();
  }
}

export const useNavigateButtonsReduser = () => useReducer(formReducer, defaultValue)