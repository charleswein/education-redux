import {createAsyncThunk, createSlice, PayloadAction, createEntityAdapter, createSelector} from '@reduxjs/toolkit'
import {RootState} from "../../index.ts";
import {client} from "../../../api/client";

type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type TError = string | undefined | null;

export type TPost = {
  id: string;
  title: string;
  content: string;
  date: string;
  reactions: {[reaction: string]: number};
  user: string;
}

const postsAdapter = createEntityAdapter<TPost>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState<{
  status: TStatus;
  error: TError;
}>({
  status: 'idle',
  error: null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')

  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: {
  title: string;
  content: string;
  user: string;
}) => {
  const response = await client.post('/fakeApi/posts', initialPost)

  return response.data
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<{
      id: TPost['id'];
      title: TPost['title'];
      content: TPost['content'];
    }>) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]

      if(existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{
      postId: TPost["id"]
      reaction: keyof TPost["reactions"]
    }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers (builder) {
    builder
     .addCase(fetchPosts.pending, (state) => {
      state.status = 'loading'
    })
     .addCase(fetchPosts.fulfilled, (state, action) => {
       state.status = 'succeeded'
       postsAdapter.upsertMany(state, action.payload)
     })
     .addCase(fetchPosts.rejected, (state, action) => {
       state.status = 'failed'
       state.error = action.error.message
     })
     .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  }
})

export const {postUpdated, reactionAdded} = postsSlice.actions
export default postsSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
 [selectAllPosts, (_, userId) => userId],
 (posts, userId) => posts.filter(post => post.user === userId)
)

export const selectPostStatus = (state: RootState) => state.posts.status

export const selectError = (state: RootState) => state.posts.error
