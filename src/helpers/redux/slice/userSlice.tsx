import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../../utils/typeConfig';

interface UserState {
  isLoading: boolean;
  isStoredUserData: Boolean;
  userData: Record<string, any> | null;
  error: string | null;
  imageUrl: string;
  imageUploadLoading: boolean;
  imageError: null;
}

const inititalState: UserState = {
  isStoredUserData: false,
  userData: null,
  isLoading: false,
  error: null,
  imageUrl: '',
  imageUploadLoading: false,
  imageError: null,
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
    storedDataFetch: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
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
  },
});

export const {
  storedStatus,
  storedDataFetch,
  startUserData,
  startImageUpload,
  getImageUrl,
  getImageUrlError,
} = UserSlice.actions;

export default UserSlice.reducer;
