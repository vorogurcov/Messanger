export interface UserLK{
    id: string
    userName: string
    birthDate?: string
    avatarUrl?: string
    bio?: string
}

export const userLKInitial: UserLK = {
    id: "",
    userName: "",
    birthDate: undefined,
    avatarUrl: undefined,
    bio: undefined 
}