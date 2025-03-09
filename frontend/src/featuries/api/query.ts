import axios from "axios";
import { AuthorizationProp, RegisrationProp } from "../entities/schemes/dto/Authorization";
import core from "../../core/core";

const authInstance = axios.create({
    baseURL: core.apiBaseUrl
})

authInstance.interceptors.request.use(config => {
    const token = localStorage.getItem(core.localStorageKeys.access_token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.method?.toLowerCase() === 'post') {
        config.withCredentials = true; // Устанавливаем withCredentials для POST-запросов
    }
    return config;
}, error => {
    return Promise.reject(error);
});

authInstance.interceptors.response.use(
    response => {
        // Если ответ успешный, просто возвращаем его
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (localStorage.getItem(core.localStorageKeys.access_token) && error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Выполняем запрос к серверу для обновления токена
                const newToken = await ApiQuery.updateRefreshToken();
                localStorage.setItem(core.localStorageKeys.access_token, newToken);
                authInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                // Повторяем оригинальный запрос с новым токеном
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return authInstance(originalRequest);
            } catch (innerError) {
                if (innerError && (innerError as any).response && (innerError as any).response.status === 401){
                    localStorage.removeItem(core.localStorageKeys.access_token)
                    window.location.href = core.frontendEndpoints.login;
                } else
                    return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);


export default class ApiQuery{
    static async enter(data: AuthorizationProp){
        return axios.post(core.serverEdnpoints.enterAuth, data).then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
    }

    static async register(data: RegisrationProp){
        return axios.post(core.serverEdnpoints.regAuth, data)
    }

    static async updateRefreshToken() : Promise<string>{
        return axios.post(core.serverEdnpoints.updateRefresh).then(({data}) => data.accessToken)
    }
}