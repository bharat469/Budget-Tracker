import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginApi, RegisterApi } from '../api/authApi';
import {
  loginDataSuccess,
  loginFailure,
  loginWithEmailPassword,
  registerDataSuccess,
  registerFailure,
  registerWithEmailPassword,
  saveUserToken,
} from '../slice/authSlice';
import { storage } from '../../asyncStorageHelpers';
import { STORAGE_STRING } from '../../../utils/storageConstant';

function* EmailLoginSaga(
  action: ReturnType<typeof loginWithEmailPassword>,
): Generator<any, void, any> {
  try {
    const response = yield call(LoginApi, action.payload);
    yield put(loginDataSuccess(response));
    storage.set(STORAGE_STRING.USER_TOKEN, response.uid);
    yield put(saveUserToken(response.uid));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

function* CreateEmailPasswordResgisterSaga(
  action: ReturnType<typeof registerWithEmailPassword>,
): Generator<any, void, any> {
  try {
    const response = yield call(RegisterApi, action.payload);
    yield put(registerDataSuccess(response));
    storage.set(STORAGE_STRING.USER_TOKEN, response.uid);
    yield put(saveUserToken(response.uid));
  } catch (error: any) {
    yield put(registerFailure(error.message || 'Registeration failed'));
  }
}

export function* authSaga() {
  yield takeLatest(loginWithEmailPassword.type, EmailLoginSaga);
  yield takeLatest(
    registerWithEmailPassword.type,
    CreateEmailPasswordResgisterSaga,
  );
}
