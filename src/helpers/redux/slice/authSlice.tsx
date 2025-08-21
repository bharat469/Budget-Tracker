import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoading: boolean;
  loginData: Record<string, any> | null;
  registerData: Record<string, any> | null;
  userToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  loginData: null,
  userToken: null,
  error: null,
  registerData: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginWithEmailPassword: (
      state,
      _action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    loginDataSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.loginData = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    saveUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    registerWithEmailPassword: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    registerDataSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.registerData = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetAll: state => {
      (state.userToken = null),
        (state.loginData = null),
        (state.registerData = null);
      state.error = null;
    },
  },
});

export const {
  loginWithEmailPassword,
  loginDataSuccess,
  loginFailure,
  saveUserToken,
  registerWithEmailPassword,
  registerDataSuccess,
  registerFailure,
  resetAll,
} = AuthSlice.actions;

export default AuthSlice.reducer;
