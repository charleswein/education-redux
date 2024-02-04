import {apiSlice} from "../api/apiSlice.ts";
import {createEntityAdapter, createSelector, EntityState} from "@reduxjs/toolkit";
import {RootState} from "../../index.ts";
import {TPost} from "../posts/postsSlice.ts";

export type TUser = {
  id: string,
  name: string
}

export type TUserResponse = {
  id: string,
  firstName: string,
  lastName: string,
  name: string,
  username: string,
  posts: TPost[]
}

const usersAdapter = createEntityAdapter<TUser>()
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<TUser, string>, void>({
      query: () => '/users',
      transformResponse: (res: TUserResponse[]) => {
        return usersAdapter.setAll(initialState, res)
      },
    }),
  }),
})

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
 selectUsersResult,
 usersResult => usersResult.data
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
 usersAdapter.getSelectors<RootState>(state => {
   return selectUsersData(state) ?? initialState
 })
