import { useReducer } from "react";
import { PanelGroupButtons } from "../../featuries/entities/schemes/dto/Chat";

export enum GroupActionEnum{
    CLICK_ON_GROUP,
    RESET_FORM,
    ADD_GROUPS,
    CHOOSE,
    DELETE_GROUP,
    RENAME_GROUP,
    CHANGE_STATE
}

type FormAction =
    | { type: GroupActionEnum.CLICK_ON_GROUP; name: string}
    | { type: GroupActionEnum.RESET_FORM }
    | {type: GroupActionEnum.ADD_GROUPS; names: string[]}
    | {type: GroupActionEnum.CHOOSE; name: string}
    | {type: GroupActionEnum.DELETE_GROUP; name: string}
    | { type: GroupActionEnum.RENAME_GROUP; oldName: string, newName: string}
    | { type: GroupActionEnum.CHANGE_STATE; newState: PanelGroupButtons[]}

const defaultValue: PanelGroupButtons[] = [{active: true, name: "Все чаты", isChangeName: false}];

function formReducer(state: PanelGroupButtons[], action: FormAction): PanelGroupButtons[] {
  switch (action.type) {
    case GroupActionEnum.CLICK_ON_GROUP:
        return state.map(gr => action.name === gr.name ? {...gr, active: true} : {...gr, active: false});
    case GroupActionEnum.RESET_FORM:
        return defaultValue;
    case GroupActionEnum.ADD_GROUPS:
        return [...state, ...action.names.map(nm => {return {name: nm, active: false, isChangeName: false}})]
    case GroupActionEnum.CHOOSE:
        return state.map(gr => gr.name === action.name ? {...gr, active: true} : gr.active ? {...gr, active: false} : gr)
    case GroupActionEnum.DELETE_GROUP:
        let newState = state.filter(group => group.name !== action.name)
        newState = newState.find(gr => gr.active) ? newState : [...defaultValue, ...newState.slice(1)]
        return newState
    case GroupActionEnum.RENAME_GROUP:
        return state.map(gr => action.oldName === gr.name ? {...gr, name: action.newName} : gr);
    case GroupActionEnum.CHANGE_STATE:
        return action.newState;
    default:
      throw new Error();
  }
}

export const useGroupButtonsReduser = () => useReducer(formReducer, defaultValue)