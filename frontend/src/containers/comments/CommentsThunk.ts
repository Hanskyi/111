import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IComment, ICommentMutation } from '../../type';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<IComment[], string>(
  'comments/fetchAll',
  async (id) => {
    const commentsResponse = await axiosApi.get<IComment[]>(`/comments/${id}`);
    return commentsResponse.data;
  }
);

export const createComments = createAsyncThunk<void, ICommentMutation, { state: RootState }>(
  'comments/create',
  async (data, thunkAPI) => {
    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;

    await axiosApi.post(
      '/comments',
      data,
      {
        headers: {
          'Authorization': token
        }
      });
  },
);