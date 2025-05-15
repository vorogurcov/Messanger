export interface IShortInfoUser{
    id: string
    userName: string
}

export interface UserLK extends IShortInfoUser{
    avatarUrl?: string 
    bio?: string 
    birthDate?: string 
    email?: string
}

export const userLKInitial: UserLK = {
    id: "",
    avatarUrl: undefined,
    bio: undefined,
    userName: "",
    birthDate: undefined,
    email: ""
}