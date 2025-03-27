export interface UserLK{
    avatarUrl?: string 
    bio?: string 
    userName: string
    birthDate?: string 
}

export const userLKInitial: UserLK = {
    avatarUrl: undefined,
    bio: undefined,
    userName: "",
    birthDate: undefined,
}