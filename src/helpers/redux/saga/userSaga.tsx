import { call, put, takeLatest } from 'redux-saga/effects';
import {
  startUserData,
  storedDataFetch,
  startImageUpload,
  getImageUrl,
  getImageUrlError,
  userError,
  startGetUserData,
  getUserData,
} from '../slice/userSlice';
import { GetDataUser, StoreDataOfUser, uploadImageApi } from '../api/userApi';
import { storage } from '../../asyncStorageHelpers';
import { STORAGE_STRING } from '../../../utils/storageConstant';
import { normalizeEmail, normalizePhone } from '../../../utils/helperFunction';

function* userStoreData(
  action: ReturnType<typeof startUserData>,
): Generator<any, void, any> {
  try {
    const response = yield call(StoreDataOfUser, action.payload);
    yield put(storedDataFetch());
  } catch (e) {
    yield put(userError(e));
  }
}

function* uploadImageSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(uploadImageApi, action.payload);

    yield put(getImageUrl(response));
  } catch (e) {
    yield put(getImageUrlError(e));
  }
}

function* getUserDataSaga(): Generator<any, void, any> {
  try {
    const response = yield call(GetDataUser);
    if (response.length !== 0) {
      let phoneNumber = yield storage.get(STORAGE_STRING.PHONE_NUMBER);
      let email = yield storage.get(STORAGE_STRING.EMAIL);
      const data = response.filter((item: any) => {
        return (
          normalizePhone(item.payload?.phoneNumber) ===
            normalizePhone(phoneNumber) ||
          normalizeEmail(item.payload?.email) === normalizeEmail(email)
        );
      });

      yield put(getUserData(data));
    } else {
      yield put(getUserData([]));
    }

  } catch (e) {
    yield put(userError(e));
  }
}

export function* userSaga() {
  yield takeLatest(startUserData.type, userStoreData);
  yield takeLatest(startImageUpload.type, uploadImageSaga);
  yield takeLatest(startGetUserData.type, getUserDataSaga);
}
