import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalError, IRegister, IRegisterResponse, ValidateError } from '../../type';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './userSlice';

export const fetchRegister = createAsyncThunk<
  IRegisterResponse,
  IRegister,
  {rejectValue: ValidateError}
>(
  'user/register',
  async (IRegister, {rejectWithValue}) => {
      try {
        const {data} = await axiosApi.post<IRegisterResponse>('/users', IRegister);
        return data;
      } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400 ) {
          return rejectWithValue(e.response.data)
        }
        throw e;
      }
  }
);

export const fetchLogin = createAsyncThunk<
  IRegisterResponse,
  IRegister,
  {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<IRegisterResponse>('/users/sessions', loginMutation);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('users/sessions', {headers: {'Authorization': token}});
    dispatch(unsetUser());
  }
);