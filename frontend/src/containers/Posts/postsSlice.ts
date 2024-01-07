import { OnePost, Post } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPosts, fetchOnePost, getPosts } from './postsThunk';

interface State {
  posts: Post[],
  loading: boolean,
  onePost: OnePost | null,
  createLoading: boolean,
  fetchOne: boolean,
}

const initialState: State = {
  posts: [],
  loading: false,
  onePost: null,
  createLoading: false,
  fetchOne: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, {payload: posts}) => {
      state.loading = false;
      state.posts = posts;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createPosts.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPosts.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPosts.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchOne = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.onePost = post;
      state.fetchOne = false;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.fetchOne = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.onePost;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;