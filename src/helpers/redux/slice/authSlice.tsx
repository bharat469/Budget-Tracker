import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerifyAuthentication } from '../../../utils/typeConfig';

export interface AuthState {
  isLoading: boolean;
  loginData: Record<string, any> | null;
  verifyOtpData: Record<string, any> | null;
  userToken: string | null;
  error: string | null;
  verifyError: string | null;
  googleSiginData: Record<string, any> | null;
  googleSiginError: string | null;
  FacebookSiginData: Record<string, any> | null;
  FacebookSiginError: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  loginData: null,
  userToken: null,
  error: null,
  verifyError: null,
  verifyOtpData: null,
  googleSiginData: null,
  googleSiginError: null,
  FacebookSiginData: null,
  FacebookSiginError: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginWithPhoneNumber: (
      state,
      _action: PayloadAction<{ phoneNumber: string }>,
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
    verifyOtpStart: (
      state,
      action: PayloadAction<{ otpNumber: string; verificationId: string }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyOtpDataSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.verifyOtpData = action.payload;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.verifyError = action.payload;
    },
    googleSiginStart: state => {
      (state.isLoading = true), (state.googleSiginError = null);
    },
    googleSiginSuccess: (state, action: PayloadAction<any>) => {
      (state.isLoading = false), (state.googleSiginData = action.payload);
    },
    googleSiginFailure: (state, action: PayloadAction<string>) => {
      (state.isLoading = false), (state.googleSiginError = action.payload);
    },
    FacebookSiginStart: state => {
      (state.isLoading = true), (state.FacebookSiginError = null);
    },
    FacebookSiginSuccess: (state, action: PayloadAction<any>) => {
      (state.isLoading = false), (state.FacebookSiginData = action.payload);
    },
    FacebookSiginFailure: (state, action: PayloadAction<string>) => {
      (state.isLoading = false), (state.FacebookSiginError = action.payload);
    },
    logoutStart: state => {
      state.isLoading = true;
    },

    resetAll: state => {
      (state.userToken = null),
        (state.loginData = null),
        (state.verifyOtpData = null);
      state.error = null;
      state.verifyError = null;
      state.googleSiginData = null;
      state.googleSiginError = null;
      state.FacebookSiginData = null;
      state.FacebookSiginError = null;
    },
  },
});

export const {
  loginWithPhoneNumber,
  loginDataSuccess,
  loginFailure,
  saveUserToken,
  verifyOtpStart,
  verifyOtpDataSuccess,
  verifyOtpFailure,
  googleSiginStart,
  googleSiginSuccess,
  googleSiginFailure,
  FacebookSiginFailure,
  FacebookSiginStart,
  FacebookSiginSuccess,
  logoutStart,
  resetAll,
} = AuthSlice.actions;

export default AuthSlice.reducer;
