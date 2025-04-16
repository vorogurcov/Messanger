import { useReducer } from "react";
import { PanelButtons as PanelGroupButtons } from "../../featuries/entities/schemes/dto/Chat";

export enum GroupActionEnum{
    UPDATE_GROUP,
    RESET_FORM,
    ADD_GROUPS,
    CHOOSE,
    DELETE_GROUP
}

type FormAction =
    | { type: GroupActionEnum.UPDATE_GROUP; name: string}
    | { type: GroupActionEnum.RESET_FORM }
    | {type: GroupActionEnum.ADD_GROUPS; names: string[]}
    | {type: GroupActionEnum.CHOOSE; name: string}
    | {type: GroupActionEnum.DELETE_GROUP; name: string}

const defaultValue: PanelGroupButtons[] = [{active: true, name: "Все чаты"}];

function formReducer(state: PanelGroupButtons[], action: FormAction): PanelGroupButtons[] {
  switch (action.type) {
    case GroupActionEnum.UPDATE_GROUP:
        return state.map(button => action.name === button.name ? {...button, active: true} : {...button, active: false});
    case GroupActionEnum.RESET_FORM:
        return defaultValue;
    case GroupActionEnum.ADD_GROUPS:
        return [...state, ...action.names.map(nm => {return {name: nm, active: false}})]
    case GroupActionEnum.CHOOSE:
        return state.map(but => but.name === action.name ? {...but, active: true} : but.active ? {...but, active: false} : but)
    case GroupActionEnum.DELETE_GROUP:
        let newState = state.filter(group => group.name !== action.name)
        newState = newState.find(gr => gr.active) ? newState : [...defaultValue, ...newState.slice(1)]
        return newState
    default:
      throw new Error();
  }
}

export const useGroupButtonsReduser = () => useReducer(formReducer, defaultValue)