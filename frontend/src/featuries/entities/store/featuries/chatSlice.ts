import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiQuery from "../../../api/query"
import { ChatListAdaptedProps } from "../../schemes/client/chat"
import { ChatList } from "../../schemes/dto/Chat"

const adaptingApiToClient = (chats: ChatList[]): ChatListAdaptedProps[] => {
    return chats.map(chat => {return {...chat, active: false, numberNewMessage: 0}})
}

const getAllChats = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'chatList/getAllChats',
    async () => {
        const chats = adaptingApiToClient((await ApiQuery.getChatLists()))
        console.log("geeet chats thunk")
        return chats
    }
)

const getChatsByGroup = createAsyncThunk(
    'chatList/getChatByGroup',
    async (groupId: string) => {
        const chats = adaptingApiToClient((await ApiQuery.getChatListsByGroup(groupId)))
        return chats
    }
)

const initialState: ChatListAdaptedProps[] = [];

const chatSlice = createSlice({
    name: "chatList",
    initialState: initialState,
    reducers: {
        update(state, action: PayloadAction<ChatListAdaptedProps[]>){
            return action.payload
        }
    },
    selectors: {
        selectChats: (state) => {
            console.log("chat state", state)
            return state
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getAllChats.fulfilled, (state, action) => {
            return action.payload
        })
        .addCase(getChatsByGroup.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const chatSliceReducer = chatSlice.reducer

export const ChatSliceManager = {
    redusers: {
        update: chatSlice.actions.update
    },

    selectors: {
        selectChats: chatSlice.selectors.selectChats
    },

    fetching: {
        getAllChats: getAllChats,
        getChatsByGroup: getChatsByGroup
    }
}