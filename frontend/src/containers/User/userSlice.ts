import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister } from './userThunk';
import { RootState } from '../../app/store';
import { GlobalError, IUser, ValidateError } from '../../type';

interface State {
  user: IUser | null,
  registerError: ValidateError | null,
  registerLoading: boolean,
  loginLoading: boolean,
  loginError: GlobalError | null;
}

const initialState: State = {
  user: null,
  registerError: null,
  registerLoading: false,
  loginLoading: false,
  loginError:  null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state,{payload: {user}}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(fetchRegister.rejected, (state,{ payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state,{payload: {user}}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(fetchLogin.rejected, (state,{ payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  },
})

export const userReducer = userSlice.reducer;
export  const selectUserLoading = (state: RootState) => state.users.registerLoading;
export  const selectUser = (state: RootState) => state.users.user;
export  const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
export  const selectLoginLoading = (state: RootState) => state.users.loginLoading;


export const {unsetUser} = userSlice.actions;
