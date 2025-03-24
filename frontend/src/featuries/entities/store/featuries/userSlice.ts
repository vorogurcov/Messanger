import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLK, userLKInitial } from "../../schemes/dto/User";
import ApiQuery from "../../../api/query";

const saveUserLK = createAsyncThunk(
    'userLK/save',
    async (user: UserLK) => {
        await ApiQuery.saveUserLK(user)
        return user
    }
)

const getUserLK = createAsyncThunk(
    'userLK/getData',
    async () => {
        const user: UserLK = await ApiQuery.getUserLK()
        return user
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