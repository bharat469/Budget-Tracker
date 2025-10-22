import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { dataSaga } from './dataSaga';

export function* rootSaga() {
  yield all([authSaga(), userSaga(), dataSaga()]);
}
