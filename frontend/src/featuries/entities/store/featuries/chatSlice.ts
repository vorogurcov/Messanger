import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { allChats, ChatType } from "../../schemes/enums/chatEnum"
import ApiQuery from "../../../api/query"
import { ChatListAdaptedProps } from "../../../components/pages/Home/components/GroupChatList/ChatList/types"

const getChats = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'chatList/getChats',
    async ({typeChat, group = allChats}: {typeChat: ChatType, group: string}) => {
        const chats = (await ApiQuery.getChatLists(typeChat, group)).map(chat => {return {...chat, active: false}})
        console.log("geeet chats thunk")
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
        .addCase(getChats.fulfilled, (state, action) => {
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
        getData: getChats
    }
}