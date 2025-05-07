import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLK, userLKInitial } from "../../schemes/dto/User";
import ApiQuery from "../../../api/query";

interface IUserSlice{
    data: UserLK
}

const initial: IUserSlice = {
    data: userLKInitial
}

const saveUserLK = createAsyncThunk( // если в ответе не приходит новый аватор то дело сомнительное
    'userLK/save',
    async ({user, userAvatarOld, files}: {user: UserLK, userAvatarOld: string | undefined, files: FileList | null}) => {
        await ApiQuery.saveUserLK(user, userAvatarOld, files)
        return user
    }
)

const getUserLK = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'userLK/getData',
    async () => {
        const user = (await ApiQuery.getUserLK()).data.userProfile
        const keys = Object.keys(userLKInitial)
        let userAdapted = {}
        keys.forEach(key => {
            userAdapted = {
                ...userAdapted, 
                [key]: user[key] === null || user[key] === 'null' || user[key].length === 0 ? undefined : user[key]
            }
        })
        return userAdapted as UserLK
    }
)

const userSlice = createSlice({
    name: "userLK",
    initialState: initial,
    reducers: {
        update(state, action: PayloadAction<UserLK>){
            state.data = action.payload
        }
    },
    selectors: {
        selectUser: (state) => {
            return state.data
        }
    },
    extraReducers: builder => {
        builder
        .addCase(saveUserLK.fulfilled, (state, action) => {
            state.data = action.payload
        })
        .addCase(getUserLK.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const userSliceReducer = userSlice.reducer

export const UserSliceManager = {
    redusers: {
        update: userSlice.actions.update
    },

    selectors: {
        selectUser: userSlice.selectors.selectUser
    },

    fetching: {
        save: saveUserLK,
        getData: getUserLK
    }
}