import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLK, userLKInitial } from "../../schemes/dto/User";
import ApiQuery from "../../../api/query";

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
        keys.map(key => userAdapted = 
            {...userAdapted, [key]: user[key] === null || user[key] === 'null' || user[key].length === 0 ? undefined : user[key]}
        )
        return userAdapted as UserLK
    }
)

const userSlice = createSlice({
    name: "userLK",
    initialState: userLKInitial,
    reducers: {
        update(state, action: PayloadAction<UserLK>){
            return action.payload
        }
    },
    selectors: {
        selectUser: (state) => {
            return state
        }
    },
    extraReducers: builder => {
        builder
        .addCase(saveUserLK.fulfilled, (state, action) => {
            return action.payload
        })
        .addCase(getUserLK.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const userSliceReducer = userSlice.reducer

export const UserSliceManager = {
    redusers: {
        update: userSlice.caseReducers.update
    },

    selectors: {
        selectUser: userSlice.selectors.selectUser
    },

    fetching: {
        save: saveUserLK,
        getData: getUserLK
    }
}