import { call, put, takeLatest } from 'redux-saga/effects';
import {
  startUserData,
  storedDataFetch,
  startImageUpload,
  getImageUrl,
  getImageUrlError,
} from '../slice/userSlice';
import { StoreDataOfUser, uploadImageApi } from '../api/userApi';

function* userStoreData(
  action: ReturnType<typeof startUserData>,
): Generator<any, void, any> {
  try {
    const response = yield call(StoreDataOfUser, action.payload);
    // yield put(storedDataFetch)
    console.log('response', response);
  } catch (e) {
    console.log('error is ', e);
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

export function* userSaga() {
  yield takeLatest(startUserData.type, userStoreData);
  yield takeLatest(startImageUpload.type, uploadImageSaga);
}
