import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {TPost} from "../posts/postsSlice.ts";

type TAddNewPostParams = {
  title: string;
  content: string;
  user: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<TPost[], string>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<TPost, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation<TPost, TAddNewPostParams>({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice
