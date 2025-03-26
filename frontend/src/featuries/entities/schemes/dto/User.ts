export interface UserLK{
    login: string
    userName: string
    birthDate?: string
    avatarUrl?: string
    bio?: string
}

export const userLKInitial: UserLK = {
    login: "",
    userName: "",
    birthDate: undefined,
    avatarUrl: undefined,
    bio: undefined 
}