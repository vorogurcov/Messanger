import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiQuery from "../../../api/query"
import { ChatListAdaptedProps } from "../../schemes/client/chat"
import { ChatList } from "../../schemes/dto/Chat"
import { ChatType } from "../../schemes/enums/chatEnum"
import { RootState } from "../store"

interface IChatSlice{
    data: ChatListAdaptedProps[],
    searched: ChatListAdaptedProps[]
    selected: ChatListAdaptedProps | null
}

const initial: IChatSlice = {
    data: [],
    searched: [],
    selected: null
}

const adaptingApiToClient = (chats: ChatList[]): ChatListAdaptedProps[] => {
    return chats.map(chat => {return {...chat, active: false, numberNewMessage: 0}})
}

const getAllChats = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'chatList/getAllChats',
    async () => {
        const chats = adaptingApiToClient((await ApiQuery.getChatLists()))
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

const updateSearch = createAsyncThunk(
    'chatList/updateSeach',
    (chats: ChatListAdaptedProps[], thunkAPI) => {// в ChatListAdaptedProps тут в id не id чата, а id юзера
        const rootState = thunkAPI.getState() as RootState
        const stateChat = rootState.chatList.data
        const stateUser = rootState.userLK.data
        const directChats = stateChat.filter(
            chat => chat.type !== ChatType.group
        )
        // если лс существует с данным юзером, то его в серче не выдаем
        chats = chats.filter(chat => !directChats.find(dirchat => !!dirchat.users.find(us => us.id === chat.id)) && chat.id !== stateUser.id)
        return chats
    }
)

const chatSlice = createSlice({
    name: "chatList",
    initialState: initial,
    reducers: {
        update(state, action: PayloadAction<ChatListAdaptedProps[]>) {
            state.data = action.payload;
        },
        selectChat(state, action: PayloadAction<ChatListAdaptedProps | null>) {
            state.selected = action.payload;
        },
        updateChatLastMessage(state, action: PayloadAction<{ chatId: string, lastMessage: ChatListAdaptedProps["lastMessage"] }>) {
            const { chatId, lastMessage } = action.payload;
            const chat = state.data.find(chat => chat.id === chatId);
            if (chat) {
                chat.lastMessage = lastMessage;
            }
        }
    },

    selectors: {
        selectChats: (state) => {
            return state.data 
        },
        selectSelected: (state) => {
            return state.selected
        },
        selectSearched: (state) => {
            console.log("state selected slice", state)
            return state.searched
        },
        selectState: (state) => {
            return state
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
        .addCase(updateSearch.fulfilled, (state, action) => {
            state.searched = action.payload
        })
    }
})

export const chatSliceReducer = chatSlice.reducer

export const ChatSliceManager = {
    redusers: {
        update: chatSlice.actions.update,
        updateSearch: updateSearch,
        selectChat: chatSlice.actions.selectChat,
        updateChatLastMessage: chatSlice.actions.updateChatLastMessage
    },

    selectors: {
        selectChats: chatSlice.selectors.selectChats,
        selectSelected: chatSlice.selectors.selectSelected,
        selectSearched: chatSlice.selectors.selectSearched,
        selectState: chatSlice.selectors.selectState
    },

    fetching: {
        getAllChats: getAllChats,
        getChatsByGroup: getChatsByGroup
    }
}