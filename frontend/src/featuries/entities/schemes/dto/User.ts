export interface UserLK{
    id: string
    avatarUrl?: string 
    bio?: string 
    userName: string
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