import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {nanoid} from "nanoid";
import {RootState} from "../../index.ts";
import {client} from "../../../api/client";

export const initialReactionsState = {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
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

const initialState: {
  posts: TPost[];
  status: TStatus;
  error: TError;
} = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  console.log(response)
  return response.data
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<TPost>){
        state.posts.push(action.payload)
      },
      prepare(title: TPost['title'], content: TPost['content'], userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            reactions: initialReactionsState,
            user: userId,
          }
        }
      }
    },
    postUpdated(state, action: PayloadAction<{
      id: TPost['id'];
      title: TPost['title'];
      content: TPost['content'];
    }>) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
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
      const existingPost = state.posts.find(post => post.id === postId)
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
       // Add any fetched posts to the array
       state.posts = state.posts.concat(action.payload)
     })
     .addCase(fetchPosts.rejected, (state, action) => {
       state.status = 'failed'
       state.error = action.error.message
     })
  }
})

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId?: string) =>
 state.posts.posts.find(post => post.id === postId);

export const selectPostStatus = (state: RootState) => state.posts.status

export const selectError = (state: RootState) => state.posts.error
