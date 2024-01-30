import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./features/posts/postsSlice.ts";
import usersReducer from "./features/users/usersSlice.ts";
import notificationsSlice from "./features/notifications/notificationsSlice.ts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsSlice
  },
  devTools: {
    trace: true,
    traceLimit: 25
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;
