import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {client} from "../../../api/client";
import {RootState} from "../../index.ts";

export type TUser = {
  id: string,
  name: string
}

const usersAdapter = createEntityAdapter<TUser>()
const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state:RootState) => state.users)

export default usersSlice.reducer
