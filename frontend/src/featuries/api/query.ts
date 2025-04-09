import axios from "axios";
import { AuthorizationProp, RegisrationProp } from "../entities/schemes/dto/Authorization";
import core from "../../core/core";
import { ChatType } from "../entities/schemes/enums/chatEnum";
import { ChatList, PanelButtons } from "../entities/schemes/dto/Chat";
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

    private static getTypeUpdateProfile(user: UserLK, userAvatarOld: string | undefined): AvatarAction{
        let type: AvatarAction
        if (user.avatarUrl === userAvatarOld){
            type = 'keep'
        }
        else if (!user.avatarUrl && userAvatarOld){
            type = 'delete'
        }
        else{
            type = 'update'
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

    static async getChatGroups(type: ChatType): Promise<PanelButtons[]>{
        return [{id: 1, name: "Группа 1", active: false}, {id: 2, name: "Группа 2", active: false}]
    }

    static async confirmCode(id: string, code: string){
        return axios.post(core.serverEdnpoints.confirmCode, {userId: id, confirmationCode: code}, {withCredentials: true})
    }

    static async getUserLK(): Promise<any>{
        return authInstance.get(this.generateUrlServer("/profile/me"))
    }

    static async saveUserLK(user: UserLK, userAvatarOld: string | undefined, files: FileList | null){
        let type: AvatarAction = ApiQuery.getTypeUpdateProfile(user, userAvatarOld)
        
        const formData = new FormData()
        formData.append('avatarAction', type)
        if (files)
            formData.append('file', files[0])
        Object.keys(user).forEach((key) => {
            const value = user[key as keyof typeof user];
            if (value !== undefined) {  // Проверка на undefined
              formData.append(key, value as string); // Предполагается, что все значения user являются строками
            }
        })
        return authInstance.patch(this.generateUrlServer("/profile"), formData)
    }

    static async verifyPassword(password: string){
        const passwordVerifiedMarker = await authInstance.post(this.generateUrlServer("/profile/verify/password"), {password: password})
        localStorage.setItem("passwordVerifiedMarker", passwordVerifiedMarker.data.passwordVerifiedMarker)
        return "asadas"
    }

    static async updateCredentails(data: {email: string | undefined, password: string| undefined}){
        let fetchData = {} 
        Object.keys(data).forEach(key => data[key as keyof typeof data] ? fetchData = {...fetchData, [key]: data[key as keyof typeof data]} : null)
        const passwordVerifiedMarker = localStorage.getItem("passwordVerifiedMarker")
        passwordVerifiedMarker && await authInstance.patch(this.generateUrlServer("/profile/credentials"), {...fetchData, passwordVerifiedMarker: passwordVerifiedMarker})
        localStorage.removeItem("passwordVerifiedMarker")
    }

    static async getChatLists(group: string, typeChat: ChatType): Promise<ChatList[]>{
        const chats: ChatList[] = [
            {
                id: 1,
                userName: "Ivan",
                lastMessage: "Дедлайн горит",
                numberNewMessage: 2,
                avatar: undefined,
                group: "Все чаты",
                typeChat: ChatType.chats
            },
            {
                id: 2,
                userName: "Maria",
                lastMessage: "Я спать",
                numberNewMessage: 1,
                avatar: undefined,
                group: "Группа 1",
                typeChat: ChatType.chats
            },
            {
                id: 3,
                userName: "Кристина",
                lastMessage: "АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА",
                numberNewMessage: 0,
                avatar: "https://avatars.mds.yandex.net/i?id=f4631fb3f8dab100dcea28446f16ef23_l-6498965-images-thumbs&n=13",
                group: "Все чаты",
                typeChat: ChatType.chats
            },
        ]
        return chats.filter(chat => chat.group === group && chat.typeChat === typeChat)
    }
}