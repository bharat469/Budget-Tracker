import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../../utils/typeConfig';

interface UserState {
  isLoading: boolean;
  isStoredUserData: Boolean;
  userData: Record<string, any> | null;
  userDataSuccess: boolean;
  error: string | null;
  imageUrl: string;
  imageUploadLoading: boolean;
  imageError: null;
}

const inititalState: UserState = {
  isStoredUserData: false,
  userData: null,
  isLoading: true,
  error: null,
  imageUrl: '',
  imageUploadLoading: false,
  imageError: null,
  userDataSuccess: false,
};

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: inititalState,
  reducers: {
    startUserData: (state, _action: PayloadAction<UserData>) => {
      state.isLoading = true;
      state.error = null;
    },
    storedStatus: (state, action) => {
      state.isStoredUserData = action.payload;
      state.isLoading = false;
    },
    storedDataFetch: state => {
      state.userDataSuccess = true;
      //  state.isLoading = false;
    },
    startImageUpload: (state, _action: PayloadAction<string>) => {
      state.imageUploadLoading = true;
      state.error = null;
    },
    getImageUrl: (state, action) => {
      state.imageUrl = action.payload;
      state.imageUploadLoading = false;
    },
    getImageUrlError: (state, action) => {
      (state.imageError = action.payload), (state.imageUploadLoading = false);
    },
    startGetUserData: state => {
      (state.isLoading = true), (state.error = null);
    },

    getUserData: (state, action) => {
      (state.userData = action.payload), (state.isLoading = false);
    },
    userError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  storedStatus,
  storedDataFetch,
  startUserData,
  startImageUpload,
  getImageUrl,
  getImageUrlError,
  startGetUserData,
  getUserData,
  userError,
} = UserSlice.actions;

export default UserSlice.reducer;
