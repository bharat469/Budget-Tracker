import { configureStore } from '@reduxjs/toolkit';
import UserData from './slice/userSlice';
import AuthReducer from './slice/authSlice';
import ExpenseSlice from './slice/dataSlice';
import { rootSaga } from './saga/rootSaga';

const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    userData: UserData,
    expenseData: ExpenseSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
