import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SaveExpensePayload,
  UpdateExpenseType,
} from '../../../utils/typeConfig';

interface dataState {
  isLoadingExpenseSave: boolean;
  isLoadingGetExpense: boolean;
  isLoadingUpdateExpense: boolean;
  expenseSavedSuccess: boolean;
  expenseDeleteSuccess: boolean;
  expenseError: string | null;
  expenseData: Record<string, any> | null;
  expenseGetError: string | null;
  updateDataSuccess: boolean;
  updateError: null;
  updatedDataHome: null;
  isDataLoadingHome: boolean;
  isDataErrorHome: null;
  getDataLoading: boolean;
  getDataSuccess: [];
  getDataError: null;
}

const initialState: dataState = {
  expenseDeleteSuccess: false,
  expenseSavedSuccess: false,
  expenseError: null,
  expenseData: null,
  expenseGetError: null,
  isLoadingExpenseSave: false,
  isLoadingGetExpense: false,
  updateDataSuccess: false,
  updateError: null,
  isLoadingUpdateExpense: false,
  isDataErrorHome: null,
  isDataLoadingHome: false,
  updatedDataHome: null,
  getDataLoading: false,
  getDataSuccess: [],
  getDataError: null,
};

const dataState = createSlice({
  name: 'dataSlice',
  initialState: initialState,
  reducers: {
    startAddExpense: (state, _action: PayloadAction<SaveExpensePayload>) => {
      state.isLoadingExpenseSave = true;
      state.expenseError = null;
    },
    storeExpenseSuccess: state => {
      state.isLoadingExpenseSave = false;
      state.expenseSavedSuccess = true;
    },
    storeExpenseFailure: (state, action) => {
      state.isLoadingExpenseSave = false;
      state.expenseError = action.payload;
    },
    startUpdateExpense: (state, _action: PayloadAction<UpdateExpenseType>) => {
      state.updateDataSuccess = true;
      state.isLoadingUpdateExpense = true;
    },
    updateSuccess: (state, _action) => {
      state.isLoadingUpdateExpense = false;
      state.updateDataSuccess = true;
    },
    updateErrorFunc: (state, action) => {
      state.isLoadingUpdateExpense = false;
      state.updateError = action.payload;
    },

    startIsDataUpdate: (state, action: PayloadAction<string>) => {
      state.isDataLoadingHome = true;
      state.isDataErrorHome = null;
    },
    successIsDataUpdateHome: (state, action) => {
      state.isDataLoadingHome = false;
      state.updatedDataHome = action.payload;
    },
    errorIsDataUpdateHome: (state, action) => {
      state.isDataErrorHome = action.payload;
    },
    stopUserListener: state => {
      state.isDataLoadingHome = false;
      state.isDataErrorHome = null;
    },
    startGetData: (state, action: PayloadAction<string>) => {
      state.getDataLoading = true;
      state.getDataError = null;
    },
    GetDataSuccess: (state, action) => {
      state.getDataLoading = false;
      state.getDataSuccess = action.payload;
    },
    GetDataError: (state, action) => {
      state.getDataLoading = false;
      state.getDataError = action.payload;
    },

    resetExpense: state => {
      state.isLoadingExpenseSave = false;
      state.expenseSavedSuccess = false;
      state.expenseError = null;
      state.updateDataSuccess = false;
      state.isLoadingUpdateExpense = false;
      state.updateError = null;
      state.updatedDataHome = null;
      state.getDataLoading = false;
      state.getDataError = null;
      state.getDataSuccess = [];
    },
  },
});

export const {
  startAddExpense,
  storeExpenseSuccess,
  storeExpenseFailure,
  resetExpense,
  updateErrorFunc,
  updateSuccess,
  startUpdateExpense,
  startIsDataUpdate,
  successIsDataUpdateHome,
  errorIsDataUpdateHome,
  stopUserListener,
  startGetData,
  GetDataSuccess,
  GetDataError,
} = dataState.actions;

export default dataState.reducer;
