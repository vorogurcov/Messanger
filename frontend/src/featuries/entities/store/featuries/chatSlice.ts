import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiQuery from "../../../api/query"
import { ChatListAdaptedProps } from "../../schemes/client/chat"
import { ChatList } from "../../schemes/dto/Chat"

interface IChatSlice{
    data: ChatListAdaptedProps[],
    searched: ChatListAdaptedProps[]

}

const initial: IChatSlice = {
    data: [],
    searched: []
}

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

const chatSlice = createSlice({
    name: "chatList",
    initialState: initial,
    reducers: {
        update(state, action: PayloadAction<ChatListAdaptedProps[]>){
            state.data = action.payload
        },
        updateSearch(state, action: PayloadAction<ChatListAdaptedProps[]>){
            state.searched = action.payload
        }
    },
    selectors: {
        selectChats: (state) => {
            console.log("chat state", state)
            return state.searched.length === 0 ? state.data : state.searched
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getAllChats.fulfilled, (state, action) => {
            state.data = action.payload
        })
        .addCase(getChatsByGroup.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const chatSliceReducer = chatSlice.reducer

export const ChatSliceManager = {
    redusers: {
        update: chatSlice.actions.update,
        updateSearch: chatSlice.actions.updateSearch
    },

    selectors: {
        selectChats: chatSlice.selectors.selectChats
    },

    fetching: {
        getAllChats: getAllChats,
        getChatsByGroup: getChatsByGroup
    }
}