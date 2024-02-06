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
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction }
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
         apiSlice.util.updateQueryData('getPosts', undefined, draft => {
           console.log(draft)
           const post = draft.find(post => post.id === postId)
           if (post) {
             post.reactions[reaction]++
           }
         })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation
} = apiSlice
