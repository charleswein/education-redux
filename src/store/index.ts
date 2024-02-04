import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./features/posts/postsSlice.ts";
import notificationsSlice from "./features/notifications/notificationsSlice.ts";
import {extendedApiSlice} from "./features/users/usersSlice.ts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsSlice,
    [extendedApiSlice.reducerPath]: extendedApiSlice.reducer
  },
  devTools: {
    trace: true,
    traceLimit: 25
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extendedApiSlice.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;
