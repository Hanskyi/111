import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IPostMutation, OnePost, Post } from '../../type';
import {RootState} from "../../app/store";

export const getPosts = createAsyncThunk<Post[]>(
  'posts/fetch',
  async () => {
    const {data} = await axiosApi.get<Post[] | null>('/posts');
    if (!data) {
      return [];
    }
    return data;
  }
);

export const fetchOnePost = createAsyncThunk<OnePost, string>(
    'posts/fetchOne',
    async (id) => {

        const response = await axiosApi.get<OnePost | null>('/posts/' + id);
        const post = response.data;

        if (post === null) {
            throw new Error('Not found');
        }

        return post;
    }
);

export const createPosts = createAsyncThunk<void, IPostMutation, { state: RootState }>(
    'posts/create',
    async (data, thunkAPI) => {
      const formData = new FormData();
      console.log(data);
      const keys = Object.keys(data) as (keyof IPostMutation)[];

      keys.forEach(key => {
        const value = data[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

        const usersState = thunkAPI.getState().users;
        const token = usersState.user?.token;
      await axiosApi.post('/posts', formData, {headers: {'Authorization': token}});
    }
);