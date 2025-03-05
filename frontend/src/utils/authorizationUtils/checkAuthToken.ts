import core from "../../core/core";

export function checkAuthToken(){
    return !!localStorage.getItem(core.localStorageKeys.access_token)
}