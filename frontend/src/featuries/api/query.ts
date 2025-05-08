import axios, { GenericAbortSignal } from "axios";
import { AuthorizationProp, RegisrationProp } from "../entities/schemes/dto/Authorization";
import core from "../../core/core";
import { ChatList, PanelGroupButtons } from "../entities/schemes/dto/Chat";
import { UserLK } from "../entities/schemes/dto/User";
import authInstance from "./authinstance";

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

    static async getChatGroups(): Promise<PanelGroupButtons[]>{
        const groups = (await authInstance.get(core.serverEdnpoints.groups)).data.groups as {name: string, id: string}[]
        return groups.map(gr => {return {...gr, active: false, isChangeName: false}})
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
        // Object.keys(user).forEach((key) => {
        //     const value = user[key as keyof typeof user];
        //     if (value !== undefined) {  // Проверка на undefined
        //       formData.append(key, value as string); // Предполагается, что все значения user являются строками
        //     }
        // })
        user.bio && formData.append("bio", user.bio);
        user.userName && formData.append("userName", user.userName);
        user.birthDate && formData.append("birthDate", user.birthDate);
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

    static async getChatLists(): Promise<ChatList[]>{
        const chats = (await authInstance.get(core.serverEdnpoints.allChats)).data.chats
        return chats
    }

    static async getChatListsByGroup(groupId: string): Promise<ChatList[]>{
        const chats = (await authInstance.get(`${core.serverEdnpoints.groups}/${groupId}/chats`)).data.chats
        return chats
    }

    static async deleteChat(chatId: string){
        await authInstance.delete(ApiQuery.generateUrlServer(`/chats/${chatId}`))
    }

    static async addGroup(name: string, chatIds?: string[]){
        const groupId = (
            await authInstance.post(core.serverEdnpoints.groups, {name: name, createdAt: "2025-01-01", chatIds: chatIds??[]})
        ).data.group.id 
        return groupId
    }

    static async deleteGroup(id: string){
        await authInstance.delete(`${core.serverEdnpoints.groups}/${id}`)
    }

    static async updateGroup(groupId: string, name?: string, newChatIds: string[] = []){
        await authInstance.patch(`${core.serverEdnpoints.groups}/${groupId}`, {name, newChatIds})
    }

    static async findUsers(str: string, signal?: GenericAbortSignal | undefined): Promise<UserLK[]>{
        const users = (await authInstance.get(core.serverEdnpoints.searchUsers, {params: {q: str}, signal: signal})).data.users
        return users
    }
}