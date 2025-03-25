import axios from "axios";
import { AuthorizationProp, RegisrationProp } from "../entities/schemes/dto/Authorization";
import core from "../../core/core";
import { ChatType } from "../entities/schemes/enums/chatEnum";
import { PanelButtons } from "../entities/schemes/dto/Chat";
import { UserLK } from "../entities/schemes/dto/User";

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
                console.log("expired token")
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

type AvatarAction = 'keep' | 'delete' | 'update'
export default class ApiQuery{
    private static generateUrlServer(url: string){
        return core.apiBaseUrl + url
    }

    private static getTypeUpdateProfile(user: UserLK, files: FileList | null): AvatarAction{
        let type: AvatarAction
        if (!user.avatarUrl){
            if (files){
                type = 'update'
            }
            else{
                type = 'delete'
            }
        }
        else{
            type = 'keep'
        }
        return type
    }

    static async enter(data: AuthorizationProp){
        return axios.post(core.serverEdnpoints.enterAuth, data, {withCredentials: true})
        .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
    }

    static async register(data: RegisrationProp){
        return axios.post(core.serverEdnpoints.regAuth, data, {withCredentials: true})
    }

    static async updateRefreshToken() : Promise<string>{
        return axios.post(core.serverEdnpoints.updateRefresh, {}, {withCredentials: true})
        .then(({data}) => data.accessToken)
    }

    static async getChats(type: ChatType): Promise<PanelButtons[]>{
        return [{id: 1, name: "Группа 1", active: false}, {id: 2, name: "Группа 2", active: false}]
    }

    static async confirmCode(id: string, code: string){
        return axios.post(core.serverEdnpoints.confirmCode, {userId: id, confirmationCode: code}, {withCredentials: true})
    }

    static async getUserLK(): Promise<UserLK>{
        return authInstance.get(this.generateUrlServer("/profile/me"))
    }

    static async saveUserLK(user: UserLK, files: FileList | null){
        let type: AvatarAction = ApiQuery.getTypeUpdateProfile(user, files)
        
        const formData = new FormData()
        formData.append('avatarAction', type)
        if (files)
            formData.append('files', files[0])
        Object.keys(user).forEach((key) => {
            const value = user[key as keyof typeof user];
            if (value !== undefined) {  // Проверка на undefined
              formData.append(key, value as string); // Предполагается, что все значения user являются строками
            }
        })
        return authInstance.post(this.generateUrlServer("/profile"), formData)
    }
}