import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import depositFormReducer from './depositFormSlice';
import userSliceReducer from './userSlice';
import sendFormSliceReducer from './sendFormSlice';

export const store = configureStore({
  reducer: {
    depositForm: depositFormReducer,
    user: userSliceReducer,
    sendForm: sendFormSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
