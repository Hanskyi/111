import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IComment } from '../../type';
import { createComments, fetchComments } from './CommentsThunk';

interface CommentsState {
  items: IComment[],
  fetchLoading: boolean,
  createLoading: boolean;
}

export const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
      })

    builder.addCase(createComments.pending, (state) => {
      state.createLoading = true
    });
    builder.addCase(createComments.fulfilled, (state) => {
      state.createLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCreateCommentsLoading = (state: RootState) => state.comments.createLoading;


