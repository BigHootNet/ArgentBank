import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.loading = false;
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    signupRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<{ token: string }>) {
      state.loading = false;
      state.token = action.payload.token;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    profileUpdateRequest(state) {
      state.loading = true;
      state.error = null;
    },
    profileUpdateSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    profileUpdateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signupRequest,
  signupSuccess,
  signupFailure,
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateFailure,
} = authSlice.actions;

export default authSlice.reducer;
