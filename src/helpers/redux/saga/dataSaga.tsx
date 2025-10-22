import { call, put, take, takeLatest } from 'redux-saga/effects';
import { getUserData, startUserData } from '../slice/userSlice';
import {
  errorIsDataUpdateHome,
  GetDataError,
  GetDataSuccess,
  startAddExpense,
  startGetData,
  startIsDataUpdate,
  startUpdateExpense,
  storeExpenseFailure,
  storeExpenseSuccess,
  successIsDataUpdateHome,
  updateErrorFunc,
} from '../slice/dataSlice';
import {
  GetAllExpenseData,
  saveExpenseApi,
  updateExpense,
} from '../api/dataApi';

function* saveExpenseDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      saveExpenseApi,
      action.payload.payload,
      action.payload.userDocId,
    );
    yield put(storeExpenseSuccess(response));
    if (response) {
      let payload = {
        docId: action.payload.userDocId,
        expense: action.payload.expense,
        total: action.payload.total,
        income: action.payload.income,
      };

      yield put(startUpdateExpense(payload));
    }
  } catch (e) {
    console.log('error is', e);
    yield put(storeExpenseFailure(e));
  }
}

function* updateDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      updateExpense,
      action.payload.docId,
      action.payload.expense,
      action.payload.total,
      action.payload.income,
    );

    yield put(successIsDataUpdateHome(response));
  } catch (e) {
    console.log(e, 'ERROR IN UPDATE');
    yield put(updateErrorFunc(e));
  }
}

function* getExpenseData(action: any): Generator<any, void, any> {
  try {
    const response = yield call(GetAllExpenseData, action.payload);

    yield put(GetDataSuccess(response));
  } catch (e) {
    console.log(e, 'Error i n getting response');
    yield put(GetDataError(e));
  }
}

export function* dataSaga() {
  yield takeLatest(startAddExpense.type, saveExpenseDataSaga);
  yield takeLatest(startUpdateExpense.type, updateDataSaga);
  yield takeLatest(startGetData.type, getExpenseData);
}
