import { useReducer } from "react";
import { PanelGroupButtons } from "../../featuries/entities/schemes/dto/Chat";
import { allChats } from "../../featuries/entities/schemes/enums/chatEnum";

export enum GroupActionEnum{
    CLICK_ON_GROUP,
    RESET_FORM,
    ADD_GROUPS,
    DELETE_GROUP,
    RENAME_GROUP,
    CHANGE_STATE
}

type FormAction =
    | { type: GroupActionEnum.CLICK_ON_GROUP; id: string}
    | { type: GroupActionEnum.RESET_FORM }
    | {type: GroupActionEnum.ADD_GROUPS; names: {id: string, name: string}[]}
    | {type: GroupActionEnum.DELETE_GROUP; id: string}
    | { type: GroupActionEnum.RENAME_GROUP; id: string, newName: string}
    | { type: GroupActionEnum.CHANGE_STATE; newState: PanelGroupButtons[]}

const defaultValue: PanelGroupButtons[] = [{id: allChats, active: true, name: "Все чаты", isChangeName: false}];

function formReducer(state: PanelGroupButtons[], action: FormAction): PanelGroupButtons[] {
  switch (action.type) {
    case GroupActionEnum.CLICK_ON_GROUP:
        return state.map(gr => action.id === gr.id ? {...gr, active: true} : {...gr, active: false});
    case GroupActionEnum.RESET_FORM:
        return defaultValue;
    case GroupActionEnum.ADD_GROUPS:
        return [...state, ...action.names.map(nm => {return {...nm, active: false, isChangeName: false}})]
    case GroupActionEnum.DELETE_GROUP:
        let newState = state.filter(group => group.id !== action.id)
        newState = newState.find(gr => gr.active) ? newState : [...defaultValue, ...newState.slice(1)]
        return newState
    case GroupActionEnum.RENAME_GROUP:
        return state.map(gr => action.id === gr.id ? {...gr, name: action.newName} : gr);
    case GroupActionEnum.CHANGE_STATE:
        return action.newState;
    default:
      throw new Error();
  }
}

export const useGroupButtonsReduser = () => useReducer(formReducer, defaultValue)