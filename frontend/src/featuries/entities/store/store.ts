import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./featuries/userSlice";
import { chatSliceReducer } from "./featuries/chatSlice";

export const store = configureStore({
    reducer: {
      userLK: userSliceReducer,
      chatList: chatSliceReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch