import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SendOtpApi,
  RegisterApi,
  VerifyOtpApi,
  LoginByGoogleOauth,
  FacebookLoginApi,
  logout,
} from '../api/authApi';
import {
  loginDataSuccess,
  loginFailure,
  loginWithPhoneNumber,
  verifyOtpDataSuccess,
  verifyOtpFailure,
  saveUserToken,
  verifyOtpStart,
  googleSiginFailure,
  googleSiginStart,
  googleSiginSuccess,
  FacebookSiginFailure,
  FacebookSiginStart,
  FacebookSiginSuccess,
  resetAll,
  logoutStart,
} from '../slice/authSlice';
import { storage } from '../../asyncStorageHelpers';
import { STORAGE_STRING } from '../../../utils/storageConstant';

function* PhoneLoginSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(SendOtpApi, action.payload);
    yield put(loginDataSuccess(response.verificationId));
  } catch (error: any) {
    console.log('ERROR', error);
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

function* PhoneVerifyOtpSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(VerifyOtpApi, action.payload);

    yield put(verifyOtpDataSuccess(response));
    storage.set(STORAGE_STRING.USER_TOKEN, response.uid);
    storage.set(STORAGE_STRING.PHONE_NUMBER, action.payload.phoneNumber);
    yield put(resetAll());
    yield put(saveUserToken(response.uid));
  } catch (error: any) {
    console.log('error', error);
    yield put(verifyOtpFailure(error.message || 'Registeration failed'));
  }
}

function* GoogleSignInFunctionSaga(): Generator<any, void, any> {
  try {
    const response = yield call(LoginByGoogleOauth);
    yield put(googleSiginSuccess(response));
    storage.set(STORAGE_STRING.USER_TOKEN, response.uid);
    storage.set(STORAGE_STRING.EMAIL, response.email);
    yield put(saveUserToken(response.uid));
  } catch (error: any) {
    console.log('ERROR WHILE GOOGLE AUTH', error);
    yield put(googleSiginFailure(error.message || 'Gooogle Login Failed'));
  }
}
function* FacebookSignInFunctionSaga(): Generator<any, void, any> {
  try {
    const response = yield call(FacebookLoginApi);
    yield put(FacebookSiginSuccess(response));
    storage.set(STORAGE_STRING.USER_TOKEN, response.uid);
    storage.set(STORAGE_STRING.EMAIL, response.email);
    yield put(saveUserToken(response.uid));
  } catch (error: any) {
    console.log('ERROR WHILE FACEBOOK AUTH', error);
    yield put(FacebookSiginFailure(error.message || 'Facebook Login Failed'));
  }
}

function* LogoutSaga(): Generator<any, void, any> {
  try {
    const response = yield call(logout);
    storage.remove(STORAGE_STRING.USER_TOKEN);
    storage.remove(STORAGE_STRING.PHONE_NUMBER);
    storage.remove(STORAGE_STRING.EMAIL);
    yield put(resetAll());
  } catch (error: any) {
    console.log('THE ERROR in Logout is ', error);
  }
}

export function* authSaga() {
  yield takeLatest(loginWithPhoneNumber.type, PhoneLoginSaga);
  yield takeLatest(verifyOtpStart.type, PhoneVerifyOtpSaga);
  yield takeLatest(googleSiginStart.type, GoogleSignInFunctionSaga);
  yield takeLatest(FacebookSiginStart.type, FacebookSignInFunctionSaga);
  yield takeLatest(logoutStart.type, LogoutSaga);
}
