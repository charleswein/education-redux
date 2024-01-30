import {createSlice, createAsyncThunk, PayloadAction, createEntityAdapter} from '@reduxjs/toolkit'

import {client} from '../../../api/client'
import {RootState} from "../../index.ts";

export type TNotification = {
  date: string
  timestamp: number
  user: string
  message: string
  id: string
  isNew: boolean
  read: boolean
}
const notificationsAdapter = createEntityAdapter<TNotification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const { selectAll: selectAllNotifications } =
 notificationsAdapter.getSelectors((state:RootState) => state.notifications)

export const fetchNotifications = createAsyncThunk(
 'notifications/fetchNotifications', async (_, { getState }) => {
   const state = getState() as RootState
   const allNotifications = selectAllNotifications(state);
   const [latestNotification] = allNotifications;
   const latestTimestamp = latestNotification ? latestNotification.date : ''
   const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
   )

   return response.data;
 }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<TNotification[]>) => {
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })
    })
  }
})

export const {allNotificationsRead} = notificationsSlice.actions

export default notificationsSlice.reducer
