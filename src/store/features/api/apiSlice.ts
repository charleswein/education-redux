import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {TPost} from "../posts/postsSlice.ts";

type AddNewPostParams = {
  title: string;
  content: string;
  user: string;
}

type EditPostParams = {
  id: string;
  title: string;
  content: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<TPost[], void>({
      query: () => '/posts',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      providesTags: (result= []) => [
        'Post',
        ...result.map(({ id: postId }) => ({ type: 'Post', id: postId }))
      ],
    }),
    getPost: builder.query<TPost, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags:
       (_,__, arg) =>
        [{ type: 'Post', id: arg }]
    }),
    addNewPost: builder.mutation<TPost, AddNewPostParams>({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation<TPost,EditPostParams>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Post', id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation
} = apiSlice
