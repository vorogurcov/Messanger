import core from "../core/core";

export function checkAuthToken(){
    return !!localStorage.getItem(core.localStorageKeys.access_token)
}

export function decodeJWT(token: string): {id: string, login: string} {
    // Шаг 1: Разбиваем токен на массив из частей
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
  
    // Шаг 2: Берем payload (вторую часть) и декодируем из Base64Url
    const payloadBase64 = parts[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    
    // Шаг 3: Парсим JSON и возвращаем
    return JSON.parse(payloadJson);
  }